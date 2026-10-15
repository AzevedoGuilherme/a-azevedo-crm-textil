'use client';
import React,{useEffect,useRef} from 'react';
import {X,ArrowUpRight,Building2} from 'lucide-react';
import {officeLabels} from '../../lib/crm/domain';
export const money=(n:number)=>new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL',maximumFractionDigits:2}).format(n/100);
export const number=(n:number)=>n.toLocaleString('pt-BR');
export const date=(s:string)=>s?new Date(s.slice(0,10)+'T12:00:00Z').toLocaleDateString('pt-BR'):'—';
export function Badge({status}:{status:string}){return <span className={'badge '+status}>{officeLabels[status]||status}</span>}
export function Empty({title='Nada por aqui ainda',text='Os registros aparecerão conforme você alimentar o CRM.'}:{title?:string;text?:string}){return <div className="empty"><Building2 size={30}/><h3>{title}</h3><p>{text}</p></div>}
export function Field({label,children,wide=false}:{label:string;children:React.ReactNode;wide?:boolean}){return <label className={wide?'field wide':'field'}><span>{label}</span>{React.isValidElement(children)?React.cloneElement(children as React.ReactElement<any>,{'aria-label':label}):children}</label>}
export function External({href,children}:{href:string;children:React.ReactNode}){try{if(!['http:','https:'].includes(new URL(href).protocol))return null;}catch{return null;}return <a className="external" href={href} target="_blank" rel="noreferrer">{children}<ArrowUpRight size={14}/></a>}
export function Modal({title,subtitle,onClose,children,wide=false}:{title:string;subtitle?:string;onClose:()=>void;children:React.ReactNode;wide?:boolean}){const ref=useRef<HTMLDialogElement>(null);useEffect(()=>{const old=document.activeElement as HTMLElement;ref.current?.showModal();document.body.style.overflow='hidden';return()=>{document.body.style.overflow='';old?.focus();}},[]);return <dialog ref={ref} className={'modal '+(wide?'large':'')} onCancel={e=>{e.preventDefault();onClose();}} aria-label={title}><header className="modal-head"><div><h2>{title}</h2>{subtitle&&<p>{subtitle}</p>}</div><button aria-label="Fechar" className="icon-button" onClick={onClose}><X size={20}/></button></header>{children}</dialog>}
