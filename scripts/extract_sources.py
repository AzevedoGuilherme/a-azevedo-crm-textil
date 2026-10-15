from pathlib import Path
import json,re,unicodedata,collections
import openpyxl
root=Path(__file__).resolve().parents[1]
source=root.parent/'Prospecção e CRM Têxtil PE - Histórico e Arquivos'
def text(v):return str(v or '').strip()
def cnpj(v):return re.sub(r'\D','',text(v)).zfill(14)
def search(v):return ''.join(c for c in unicodedata.normalize('NFD',v.lower()) if unicodedata.category(c)!='Mn')
books={i:openpyxl.load_workbook(next(source.glob(f'{i:02}*.xlsx')),read_only=True,data_only=True) for i in range(1,5)}
rows={}
for r in books[3]['Base Geral por Cidade (1750)'].iter_rows(min_row=4,values_only=True):
 if not r[5]:continue
 k=cnpj(r[5]);rows[k]=dict(id='pe-'+k,cnpj=k,name=text(r[4] or r[3]),legalName=text(r[3]),city=text(r[0]),corridor='',address=text(r[8]),district=text(r[9]),phone=text(r[11]),email='',instagram='',site='',priority=3,classification=text(r[2]),abc='',profile=text(r[7]),officeStatus='verify',seller='',stage=0,decisionMaker='',buyer='',products='',modality='A mapear',customerStatus='lead',observations='',provenance='Base estadual · etapa 03 / cadastro original',archivedAt=None,version=1)
# Read original headers, preserve available email and decision-maker fields without overwriting enrichment.
original=list(books[1].worksheets[0].iter_rows(values_only=True))
header=next((r for r in original if any('cnpj'==search(text(x)) for x in r)),None)
if header:
 columns={search(text(v)):i for i,v in enumerate(header)}
 ci=columns.get('cnpj');ei=next((i for n,i in columns.items() if 'mail' in n),None)
 for r in original:
  if ci is None or len(r)<=ci:continue
  k=cnpj(r[ci])
  if k in rows and ei is not None and len(r)>ei:rows[k]['email']=text(r[ei])
for r in books[2]['Triagem Polo Agreste & RMR'].iter_rows(min_row=5,values_only=True):
 if r[4] and cnpj(r[4]) in rows and r[9]:rows[cnpj(r[4])]['email']=text(r[9])
for r in books[3]['Validados no Google Maps'].iter_rows(min_row=5,values_only=True):
 if not r[3] or cnpj(r[3]) not in rows:continue
 c=rows[cnpj(r[3])]
 for field,value in [('name',r[1]),('phone',r[6]),('instagram',r[7]),('site',r[8]),('products',r[11])]:
  if value:c[field]=text(value)
 c['classification']=text(r[4]);c['priority']=1
conflicts=[]
for r in books[4]['CRM Caruaru - Carteira'].iter_rows(min_row=6,values_only=True):
 if not r[5]:continue
 k=cnpj(r[5]);c=rows[k]
 if c['name']!=text(r[3]):conflicts.append({'cnpj':k,'field':'name','selected':text(r[3]),'previous':c['name']})
 for field,index in {'classification':1,'abc':2,'name':3,'legalName':4,'corridor':6,'address':7,'district':8,'profile':9,'seller':11,'decisionMaker':13,'buyer':14,'phone':15,'instagram':16,'site':17,'products':18,'modality':19,'observations':26}.items():
  if r[index] is not None:c[field]=text(r[index])
 c['officeStatus']={'Verificar no Escritório':'verify','Livre para Prospecção':'free','Desqualificado / Fechado':'closed','Minha Carteira (Ativo)':'active','Minha Carteira (Inativo)':'inactive','Outro Vendedor (Bloqueado)':'other','Conta Compartilhada':'shared'}.get(text(r[10]),'verify')
 c['stage']=int(text(r[12])[0]);c['priority']=int(text(r[1])[0]);c['customerStatus']='active' if c['officeStatus']=='active' else 'inactive' if c['officeStatus']=='inactive' else 'lead';c['provenance']='CRM Caruaru · etapa 04 + referências das etapas 01–03'
for c in rows.values():c['search']=search(' '.join(text(c.get(k)) for k in ['name','legalName','cnpj','city','phone','district','corridor']))+' '+re.sub(r'\D','',c['phone'])
data=list(rows.values());car=[c for c in data if c['city']=='CARUARU']
report={'companies':len(data),'uniqueCnpj':len(rows),'cities':len(set(c['city'] for c in data)),'caruaru':len(car),'caruaruPriority':dict(collections.Counter(c['priority'] for c in car)),'caruaruOffice':dict(collections.Counter(c['officeStatus'] for c in car)),'excludedDemoActivities':1,'conflictsResolvedByLatestSource':conflicts,'originalHeaderLocated':bool(header),'sources':[f.name for f in sorted(source.iterdir()) if f.suffix in ['.xlsx','.docx']]}
assert (len(data),len(car),report['cities'])==(1750,346,120),report
(root/'private-data').mkdir(exist_ok=True)
(root/'private-data/companies.json').write_text(json.dumps(data,ensure_ascii=False),encoding='utf-8')
(root/'private-data/import-report.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps({k:v for k,v in report.items() if k not in ['conflictsResolvedByLatestSource','sources']},ensure_ascii=False))
