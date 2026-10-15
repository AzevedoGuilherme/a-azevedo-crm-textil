import {test} from 'node:test';
import assert from 'node:assert/strict';
import {commissionCents,requiredRevenueCents,businessToday,normalizeCnpj,validateCompany,assertCanAdvance,aggregateDashboard,normalizeText} from '../lib/crm/domain.ts';
test('money preserves cents and handles zero rate',()=>{
 assert.equal(commissionCents(100000,300),3000);
 assert.equal(requiredRevenueCents(2000000,300),66666667);
 assert.equal(requiredRevenueCents(2000000,0),null);
 assert.throws(()=>commissionCents(-1,300));
 assert.throws(()=>commissionCents(100,10001));
});
test('commercial dates use Fortaleza at month boundary',()=>assert.equal(businessToday(new Date('2026-11-01T02:00:00Z')),'2026-10-31'));
test('CNPJ retains leading zeros and branches',()=>{
 assert.equal(normalizeCnpj('04.917.296/0001-60'),'04917296000160');
 assert.notEqual(normalizeCnpj('04.917.296/0001-60'),normalizeCnpj('04.917.296/0003-22'));
 assert.equal(normalizeText('TÊXTIL São'),'textil sao');
});
test('company validates required fields, CNPJ and unsafe links',()=>{
 assert.throws(()=>validateCompany({name:'',city:'CARUARU'}));
 assert.throws(()=>validateCompany({name:'Teste',city:'CARUARU',cnpj:'123'}));
 assert.throws(()=>validateCompany({name:'Teste',city:'CARUARU',site:'javascript:alert(1)'}));
 assert.doesNotThrow(()=>validateCompany({name:'Teste',city:'CARUARU',cnpj:'04.917.296/0001-60'}));
});
test('office blocks contact and close, permits initial mapping',()=>{
 assert.throws(()=>assertCanAdvance('other',2));
 assert.throws(()=>assertCanAdvance('verify',2));
 assert.doesNotThrow(()=>assertCanAdvance('free',6));
 assert.doesNotThrow(()=>assertCanAdvance('verify',0));
});
test('dashboard separates open pipeline, monthly orders and geography',()=>{
 const companies=[{id:'a',city:'CARUARU',corridor:'Centro',customerStatus:'lead',archivedAt:null,stage:1},{id:'b',city:'RECIFE',customerStatus:'active',archivedAt:null,stage:6}];
 const deals=[{companyId:'a',status:'open',amountCents:10000},{companyId:'a',status:'won',amountCents:20000},{companyId:'a',status:'lost',amountCents:90000}];
 const orders=[{companyId:'a',amountCents:20000,commissionBps:300,closedOn:'2026-10-14'},{companyId:'a',amountCents:90000,commissionBps:300,closedOn:'2026-11-01'},{companyId:'b',amountCents:50000,commissionBps:300,closedOn:'2026-10-14'}];
 const d=aggregateDashboard(companies,deals,orders,[],{month:'2026-10',city:'CARUARU',goalCents:2000000,rateBps:300});
 assert.equal(d.pipelineCents,10000);assert.equal(d.salesCents,20000);assert.equal(d.commissionCents,600);assert.equal(d.total,1);
 const empty=aggregateDashboard([],[],[],[],{month:'2026-10',goalCents:0,rateBps:0});
 assert.equal(empty.salesCents,0);assert.equal(empty.progress,null);assert.equal(empty.requiredRevenueCents,null);
});
