'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { MessageSquare, Send, Plus, Search, Trash2, X, MoreVertical, PhoneOff, Phone, Video, Info, Paperclip, Smile, User, AtSign, Shield, CheckCircle2 } from 'lucide-react';

const messagesData = [
  {
    id: 1,
    from: 'Profa. Daniela García',
    avatar: 'DG',
    subject: 'Excelente desempeño en Matemáticas',
    message: 'Carlos ha mostrado un excelente progreso en Matemáticas este mes. Felicidades por su esfuerzo.',
    time: 'Hoy 2:30 PM',
    read: false,
    role: 'Profesora',
    email: 'daniela.garcia@edunova.edu',
    messages: [
      { id: 1, from: 'Profa. Daniela García', text: 'Hola! Quería hablar contigo sobre el desempeño de Carlos en clase.', time: '2:20 PM', sender: 'other' },
      { id: 2, from: 'Tú', text: 'Claro, me gustaría saber cómo ha estado yendo.', time: '2:25 PM', sender: 'user' },
      { id: 3, from: 'Profa. Daniela García', text: 'Carlos ha mostrado un excelente progreso en Matemáticas este mes. Felicidades por su esfuerzo.', time: '2:30 PM', sender: 'other' },
    ]
  },
  {
    id: 2,
    from: 'Dirección EduNova',
    avatar: 'DE',
    subject: 'Recordatorio: Jornada de Padres 15/04',
    message: 'Le recordamos que la jornada de padres será el 15 de abril a las 3:00 PM.',
    time: 'Ayer 10:00 AM',
    read: true,
    role: 'Administración',
    email: 'direccion@edunova.edu',
    messages: [
      { id: 1, from: 'Dirección EduNova', text: 'Le recordamos que la jornada de padres será el 15 de abril a las 3:00 PM. Se requiere asistencia confirmada.', time: 'Ayer 10:00 AM', sender: 'other' },
    ]
  },
];

export default function Mensajes() {
  const [messages, setMessages] = useState(messagesData);
  const [selectedMessage, setSelectedMessage] = useState<any>(messages[0]);
  const [replyText, setReplyText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modal States
  const [showNewMessageModal, setShowNewMessageModal] = useState(false);
  const [showCallModal, setShowCallModal] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null);
  const [callStatus, setCallStatus] = useState<'calling' | 'connected' | 'ended'>('calling');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (showCallModal || showVideoModal) {
      setCallStatus('calling');
      const timer = setTimeout(() => setCallStatus('connected'), 2000);
      return () => clearTimeout(timer);
    }
  }, [showCallModal, showVideoModal]);

  const handleDeleteMessage = (id: number) => {
    const updatedMessages = messages.filter(m => m.id !== id);
    setMessages(updatedMessages);
    if (selectedMessage?.id === id) {
      setSelectedMessage(updatedMessages[0] || null);
    }
    setShowDeleteConfirm(null);
  };

  const handleReply = () => {
    if (replyText.trim() && selectedMessage) {
      const newMessage = {
        id: selectedMessage.messages.length + 1,
        from: 'Tú',
        text: replyText,
        time: 'Ahora',
        sender: 'user'
      };
      const updatedMsg = {
        ...selectedMessage,
        messages: [...selectedMessage.messages, newMessage]
      };
      setSelectedMessage(updatedMsg);
      setMessages(messages.map(m => m.id === updatedMsg.id ? updatedMsg : m));
      setReplyText('');
    }
  };

  const filteredMessages = messages.filter(msg =>
    msg.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
    msg.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-full flex flex-col bg-background relative overflow-hidden">
      <div className="flex-1 flex gap-4 p-5 md:p-6 min-h-0">
        {/* Sidebar - Lista de Chats */}
        <div className="w-full md:w-80 flex flex-col rounded-2xl border border-border/50 bg-gradient-to-br from-card to-card/80 overflow-hidden shadow-sm h-full">
          <div className="px-4 py-4 border-b border-border/50 flex-shrink-0">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-foreground">Mensajes</h1>
              <button
                onClick={() => setShowNewMessageModal(true)}
                className="p-2 bg-primary/10 hover:bg-primary/20 rounded-xl transition-all group"
              >
                <Plus className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
              </button>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Buscar conversación..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-muted/50 border border-border/30 rounded-xl text-foreground placeholder-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-transparent transition-all text-sm"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto space-y-1 p-2 scrollbar-thin">
            {filteredMessages.map(msg => (
              <div
                key={msg.id}
                onClick={() => setSelectedMessage(msg)}
                className={`w-full group relative rounded-xl p-3 transition-all text-left cursor-pointer border ${
                  selectedMessage?.id === msg.id 
                    ? 'bg-primary border-primary shadow-lg shadow-primary/20 z-10' 
                    : 'bg-card border-transparent hover:bg-muted/60 hover:border-border/50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`relative flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm transition-all shadow-sm ${
                    selectedMessage?.id === msg.id ? 'bg-white text-primary' : 'bg-primary/10 text-primary border border-primary/20'
                  }`}>
                    {msg.avatar}
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                  </div>

                  <div className="flex-1 min-w-0 py-1">
                    <div className="flex items-center justify-between mb-0.5">
                      <h3 className={`font-bold truncate text-sm ${selectedMessage?.id === msg.id ? 'text-white' : 'text-foreground'}`}>
                        {msg.from}
                      </h3>
                      <span className={`text-[10px] ${selectedMessage?.id === msg.id ? 'text-white/80' : 'text-muted-foreground/70'}`}>{msg.time.split(' ')[0]}</span>
                    </div>
                    <p className={`text-[11px] truncate uppercase tracking-tight font-black ${selectedMessage?.id === msg.id ? 'text-white/80' : 'text-primary/70'}`}>{msg.subject}</p>
                    <p className={`text-xs line-clamp-1 mt-0.5 ${selectedMessage?.id === msg.id ? 'text-white/60' : 'text-muted-foreground/70'}`}>{msg.message}</p>
                  </div>
                </div>

                <button
                  onClick={(e) => { e.stopPropagation(); setShowDeleteConfirm(msg.id); }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 opacity-0 group-hover:opacity-100 transition-all hover:bg-destructive/20 rounded-lg z-20"
                >
                  <Trash2 className="w-4 h-4 text-destructive" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        {selectedMessage ? (
          <div className="flex-1 flex flex-col rounded-2xl border border-border/50 bg-card overflow-hidden shadow-sm h-full">
            <div className="px-6 py-4 border-b border-border/50 flex items-center justify-between flex-shrink-0 bg-muted/20">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 font-bold text-sm text-primary">
                  {selectedMessage.avatar}
                </div>
                <div>
                  <h2 className="font-bold text-foreground leading-tight">{selectedMessage.from}</h2>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/70">En línea</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-1">
                <button onClick={() => setShowCallModal(true)} className="p-2.5 hover:bg-primary/10 hover:text-primary rounded-xl transition-all text-muted-foreground"><Phone className="w-4 h-4" /></button>
                <button onClick={() => setShowVideoModal(true)} className="p-2.5 hover:bg-primary/10 hover:text-primary rounded-xl transition-all text-muted-foreground"><Video className="w-4 h-4" /></button>
                <button onClick={() => setShowInfoModal(true)} className="p-2.5 hover:bg-primary/10 hover:text-primary rounded-xl transition-all text-muted-foreground"><Info className="w-4 h-4" /></button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6 flex flex-col bg-muted/5 scrollbar-thin">
              {selectedMessage.messages?.map((msg: any) => (
                <div key={msg.id} className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.sender === 'other' && (
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 border border-primary/20 text-[10px] font-bold text-primary self-end mb-4">{selectedMessage.avatar}</div>
                  )}
                  <div className={`flex flex-col gap-1 max-w-[80%] ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                    <div className={`px-4 py-2.5 shadow-sm text-sm ${
                      msg.sender === 'user' ? 'bg-primary text-white rounded-2xl rounded-br-none' : 'bg-white border border-border/40 text-foreground rounded-2xl rounded-bl-none'
                    }`}>
                      <p className="leading-relaxed">{msg.text}</p>
                    </div>
                    <span className="text-[10px] font-bold text-muted-foreground/50 px-1 uppercase tracking-tighter">{msg.time}</span>
                  </div>
                </div>
              ))}
              <div className="flex-1"></div>
            </div>

            <div className="px-6 py-4 border-t border-border/50 flex items-end gap-3 flex-shrink-0 bg-muted/10">
              <button className="p-2.5 hover:bg-muted/50 rounded-xl transition-all text-muted-foreground"><Paperclip className="w-4 h-4" /></button>
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                onKeyPress={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleReply(); } }}
                placeholder="Escribe un mensaje..."
                rows={1}
                className="flex-1 px-4 py-2.5 bg-background border border-border/50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none max-h-32"
              />
              <button onClick={handleReply} disabled={!replyText.trim()} className="p-3 rounded-xl bg-primary text-white hover:bg-primary/90 transition-all disabled:opacity-40 shadow-lg shadow-primary/20"><Send className="w-4 h-4" /></button>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center bg-muted/5 rounded-2xl border border-dashed border-border/50">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4"><MessageSquare className="w-8 h-8 text-muted-foreground/30" /></div>
            <p className="text-muted-foreground font-bold text-sm">Selecciona una conversación</p>
          </div>
        )}
      </div>

      {/* RENDER DIRECTO DEL PORTAL PARA EVITAR REMOUNTING */}
      {mounted && createPortal(
        <>
            {/* Nuevo Mensaje Modal */}
            {showNewMessageModal && (
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
                <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={() => setShowNewMessageModal(false)}></div>
                <div className="relative bg-card border border-border rounded-3xl w-full max-w-md p-8 shadow-2xl animate-in zoom-in-95 duration-200">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-foreground">Nuevo Mensaje</h2>
                    <button onClick={() => setShowNewMessageModal(false)} className="p-2 hover:bg-muted rounded-full transition-colors"><X className="w-5 h-5" /></button>
                </div>
                <div className="space-y-4">
                    <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2 block">Destinatario</label>
                    <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input type="text" placeholder="Buscar profesor o personal..." className="w-full pl-10 pr-4 py-3 bg-muted/30 border border-border rounded-xl text-sm font-bold outline-none text-foreground" />
                    </div>
                    </div>
                    <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2 block">Mensaje inicial</label>
                    <textarea rows={4} className="w-full px-4 py-3 bg-muted/30 border border-border rounded-xl text-sm font-medium outline-none resize-none text-foreground" placeholder="Escribe tu mensaje aquí..."></textarea>
                    </div>
                    <button className="w-full py-4 bg-primary text-white rounded-2xl font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all mt-4">Iniciar Conversación</button>
                </div>
                </div>
            </div>
            )}

            {/* Llamada Modal */}
            {showCallModal && (
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
                <div className="absolute inset-0 bg-primary/30 backdrop-blur-xl"></div>
                <div className="relative bg-card border border-border rounded-[40px] w-full max-w-sm p-12 shadow-2xl text-center animate-in slide-in-from-bottom-10 duration-300">
                <div className="w-28 h-28 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-8 relative">
                    <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-ping"></div>
                    <Phone className="w-12 h-12 text-primary" />
                </div>
                <h2 className="text-3xl font-bold text-foreground mb-2">{selectedMessage?.from}</h2>
                <p className="text-sm font-black uppercase tracking-[0.2em] text-primary mb-16">
                    {callStatus === 'calling' ? 'Conectando...' : 'En llamada (00:15)'}
                </p>
                <div className="flex justify-center gap-6">
                    <button onClick={() => setShowCallModal(false)} className="w-20 h-20 rounded-full bg-destructive flex items-center justify-center text-white hover:scale-110 active:scale-90 transition-all shadow-2xl shadow-destructive/40">
                    <PhoneOff className="w-8 h-8" />
                    </button>
                </div>
                </div>
            </div>
            )}

            {/* Video Modal */}
            {showVideoModal && (
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
                <div className="absolute inset-0 bg-black/90 backdrop-blur-2xl"></div>
                <div className="relative bg-card border border-border rounded-3xl w-full max-w-4xl h-[80vh] overflow-hidden shadow-2xl flex flex-col animate-in zoom-in-95 duration-300">
                    <div className="absolute top-6 right-6 z-10">
                        <button onClick={() => setShowVideoModal(false)} className="p-3 bg-white/10 hover:bg-white/20 rounded-full text-white backdrop-blur-md transition-all"><X className="w-6 h-6" /></button>
                    </div>
                    <div className="flex-1 flex items-center justify-center bg-muted/20 relative">
                        <div className="text-center text-white/50 space-y-4">
                            <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mx-auto"><Video className="w-10 h-10" /></div>
                            <p className="text-lg font-bold">Iniciando videoconferencia segura...</p>
                        </div>
                        <div className="absolute bottom-6 right-6 w-48 h-32 bg-card rounded-2xl border border-white/20 shadow-xl overflow-hidden flex items-center justify-center">
                            <User className="w-8 h-8 text-muted-foreground/30" />
                        </div>
                    </div>
                    <div className="p-8 bg-black/40 border-t border-white/10 flex justify-center gap-6">
                        <button className="w-14 h-14 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20"><PhoneOff className="w-6 h-6" /></button>
                        <button onClick={() => setShowVideoModal(false)} className="px-8 bg-destructive text-white rounded-2xl font-bold flex items-center gap-2">Finalizar</button>
                    </div>
                </div>
            </div>
            )}

            {/* Info Modal */}
            {showInfoModal && (
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
                <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={() => setShowInfoModal(false)}></div>
                <div className="relative bg-card border border-border rounded-3xl w-full max-w-sm p-8 shadow-2xl animate-in fade-in duration-200">
                <div className="text-center mb-8">
                    <div className="w-24 h-24 rounded-3xl bg-primary/10 flex items-center justify-center mx-auto mb-6 font-bold text-3xl text-primary border border-primary/20 shadow-inner">
                    {selectedMessage?.avatar}
                    </div>
                    <h2 className="text-2xl font-bold text-foreground mb-1">{selectedMessage?.from}</h2>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/70">{selectedMessage?.role}</p>
                </div>
                <div className="space-y-4">
                    <div className="flex items-center gap-3 p-4 bg-muted/20 rounded-2xl group transition-all hover:bg-muted/30">
                    <div className="p-2 rounded-lg bg-background group-hover:text-primary transition-colors"><AtSign className="w-4 h-4 text-muted-foreground" /></div>
                    <span className="text-xs font-bold text-foreground">{selectedMessage?.email}</span>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-muted/20 rounded-2xl">
                    <div className="p-2 rounded-lg bg-background"><Shield className="w-4 h-4 text-muted-foreground" /></div>
                    <span className="text-xs font-bold text-foreground">Perfil Verificado</span>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-green-500/10 border border-green-500/20 rounded-2xl">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    <span className="text-xs font-black uppercase tracking-widest text-green-600">Conexión Encriptada</span>
                    </div>
                </div>
                <button onClick={() => setShowInfoModal(false)} className="w-full mt-10 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-all">Cerrar Detalle</button>
                </div>
            </div>
            )}

            {/* Delete Confirmation */}
            {showDeleteConfirm !== null && (
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
                <div className="absolute inset-0 bg-destructive/20 backdrop-blur-xl" onClick={() => setShowDeleteConfirm(null)}></div>
                <div className="relative bg-card border border-destructive/20 rounded-[32px] w-full max-w-xs p-10 shadow-2xl text-center animate-in zoom-in-95 duration-150">
                <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-6">
                    <Trash2 className="w-8 h-8 text-destructive" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">¿Eliminar chat?</h3>
                <p className="text-sm text-muted-foreground mb-10 leading-relaxed font-medium">Esta acción no se puede deshacer y perderás todo el historial de mensajes.</p>
                <div className="flex flex-col gap-3">
                    <button onClick={() => handleDeleteMessage(showDeleteConfirm)} className="w-full py-4 text-xs font-black uppercase tracking-widest bg-destructive text-white rounded-2xl shadow-xl shadow-destructive/20 hover:scale-[1.02] active:scale-95 transition-all">Sí, Eliminar</button>
                    <button onClick={() => setShowDeleteConfirm(null)} className="w-full py-4 text-xs font-black uppercase tracking-widest text-muted-foreground hover:text-foreground">Cancelar</button>
                </div>
                </div>
            </div>
            )}
        </>,
        document.body
      )}
    </div>
  );
}
