'use client';

import React, { useState } from 'react';
import { MessageSquare, Send, Plus, Search, Trash2, X, ArrowReply, Flag, Archive } from 'lucide-react';

const messagesData = [
  {
    id: 1,
    from: 'Profa. Daniela García',
    subject: 'Excelente desempeño en Matemáticas',
    message: 'Carlos ha mostrado un excelente progreso en Matemáticas este mes. Felicidades por su esfuerzo.',
    time: 'Hoy 2:30 PM',
    read: false,
  },
  {
    id: 2,
    from: 'Dirección EduNova',
    subject: 'Recordatorio: Jornada de Padres 15/04',
    message: 'Le recordamos que la jornada de padres será el 15 de abril a las 3:00 PM. Se requiere asistencia confirmada.',
    time: 'Ayer 10:00 AM',
    read: true,
  },
  {
    id: 3,
    from: 'Profa. Juan Morales',
    subject: 'Tareas adicionales de refuerzo',
    message: 'He enviado tareas adicionales de refuerzo en divisiones. Envío están en la sección de tareas.',
    time: '2 días atrás',
    read: true,
  },
  {
    id: 4,
    from: 'Coordinadora Patricia',
    subject: 'Justificación de ausencia aceptada',
    message: 'La justificación de ausencia ha sido revisada y aceptada. Gracias por proporcionar la documentación.',
    time: '3 días atrás',
    read: true,
  },
];

export default function Mensajes() {
  const [messages, setMessages] = useState(messagesData);
  const [selectedMessage, setSelectedMessage] = useState<any>(null);
  const [replyText, setReplyText] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showNewMessageModal, setShowNewMessageModal] = useState(false);
  const [newMessageData, setNewMessageData] = useState({ to: '', subject: '', content: '' });

  const handleDeleteMessage = (id: number) => {
    setMessages(messages.filter(m => m.id !== id));
  };

  const handleReply = (id: number) => {
    if (replyText.trim()) {
      console.log(`Respuesta a mensaje ${id}: ${replyText}`);
      setReplyText('');
      setSelectedMessage(null);
      setShowModal(false);
    }
  };

  const handleNewMessage = () => {
    if (newMessageData.to && newMessageData.subject && newMessageData.content) {
      console.log('Nuevo mensaje enviado:', newMessageData);
      setNewMessageData({ to: '', subject: '', content: '' });
      setShowNewMessageModal(false);
    }
  };

  return (
    <div className="p-5 md:p-6 space-y-6 max-h-screen overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-1">Mensajes</h1>
          <p className="text-sm text-muted-foreground">Comunicación con docentes y administración</p>
        </div>
        <button
          onClick={() => setShowNewMessageModal(true)}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all shadow-sm hover:shadow-md whitespace-nowrap font-medium"
        >
          <Plus className="w-4 h-4" />
          Nuevo
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Buscar mensajes..."
          className="w-full pl-10 pr-4 py-2.5 bg-card border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
        />
      </div>

      {/* Messages List */}
      <div className="space-y-3">
        {messages.map(msg => (
          <div
            key={msg.id}
            onClick={() => {
              setSelectedMessage(msg);
              setShowModal(true);
            }}
            className="group bg-gradient-to-r from-card to-card/80 rounded-2xl border border-border/50 p-4 hover:border-primary/30 hover:shadow-md transition-all cursor-pointer hover:from-card hover:to-card/90"
          >
            <div className="flex items-start gap-4">
              {/* Avatar */}
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center border border-primary/20">
                  <MessageSquare className="w-5 h-5 text-primary" />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className={`font-semibold text-foreground truncate ${!msg.read ? 'font-bold' : ''}`}>
                    {msg.from}
                  </h3>
                  {!msg.read && <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>}
                </div>
                <p className="text-sm font-medium text-foreground mb-1 truncate">{msg.subject}</p>
                <p className="text-sm text-muted-foreground line-clamp-1">{msg.message}</p>
                <p className="text-xs text-muted-foreground mt-2">{msg.time}</p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteMessage(msg.id);
                  }}
                  className="p-2 hover:bg-destructive/20 rounded-lg transition-colors"
                  title="Eliminar"
                >
                  <Trash2 className="w-4 h-4 text-destructive" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal - Chat Style Conversación */}
      {showModal && selectedMessage && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-card rounded-2xl border border-border/50 max-w-xl w-full h-[70vh] overflow-hidden flex flex-col shadow-2xl">
            {/* Header Chat - Mejorado */}
            <div className="bg-gradient-to-r from-primary via-primary to-primary/90 px-5 py-3 flex items-center justify-between text-white shadow-sm">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center border border-white/30">
                  <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                </div>
                <div>
                  <h2 className="font-bold text-sm">{selectedMessage.from}</h2>
                  <p className="text-xs text-white/70">Activo</p>
                </div>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="p-1.5 hover:bg-white/20 rounded-lg transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Messages - Conversation Thread */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-background flex flex-col">
              {/* Separador de fecha */}
              <div className="flex items-center justify-center gap-3 my-1">
                <div className="flex-1 h-px bg-border/50"></div>
                <p className="text-xs text-muted-foreground/70 font-medium whitespace-nowrap">Hoy</p>
                <div className="flex-1 h-px bg-border/50"></div>
              </div>

              {/* Mensaje inicial del profesor */}
              <div className="flex gap-3 justify-start items-end">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center flex-shrink-0 border border-primary/20">
                  <span className="text-xs font-bold text-primary">{selectedMessage.from.charAt(0)}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="bg-muted rounded-3xl rounded-bl-sm px-5 py-3 shadow-sm">
                    <p className="text-foreground text-sm break-words">{selectedMessage.message}</p>
                  </div>
                  <span className="text-xs text-muted-foreground/70 px-3">{selectedMessage.time}</span>
                </div>
              </div>

              {/* Mensaje de respuesta simulado */}
              <div className="flex gap-3 justify-end items-end">
                <div className="flex flex-col gap-1 items-end">
                  <div className="bg-primary rounded-3xl rounded-br-sm px-5 py-3 shadow-sm max-w-lg">
                    <p className="text-primary-foreground text-sm break-words">Muchas gracias por la retroalimentación. Continuaré esforzándome.</p>
                  </div>
                  <span className="text-xs text-muted-foreground/70 px-3">Hoy 2:45 PM</span>
                </div>
              </div>

              {/* Segundo mensaje del profesor */}
              <div className="flex gap-3 justify-start items-end">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center flex-shrink-0 border border-primary/20">
                  <span className="text-xs font-bold text-primary">{selectedMessage.from.charAt(0)}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="bg-muted rounded-3xl rounded-bl-sm px-5 py-3 shadow-sm">
                    <p className="text-foreground text-sm break-words">¡Excelente! Esperamos verte en clase.</p>
                  </div>
                  <span className="text-xs text-muted-foreground/70 px-3">Hoy 2:50 PM</span>
                </div>
              </div>

              {/* Indicador de escritura - Ahora al final */}
              <div className="flex gap-3 justify-start items-end">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center flex-shrink-0 border border-primary/20">
                  <span className="text-xs font-bold text-primary">{selectedMessage.from.charAt(0)}</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-3 bg-muted rounded-3xl rounded-bl-sm shadow-sm">
                  <div className="w-2.5 h-2.5 rounded-full bg-muted-foreground/50 animate-bounce"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-muted-foreground/50 animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-muted-foreground/50 animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>

              <div className="flex-1"></div>
            </div>

            {/* Input Area - Mejorado */}
            <div className="border-t border-border/50 bg-background px-4 py-3">
              <div className="flex items-end gap-2">
                <input
                  type="text"
                  placeholder="Mensaje..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleReply(selectedMessage.id);
                    }
                  }}
                  className="flex-1 px-3 py-2 bg-muted/60 border border-border/30 rounded-lg text-foreground placeholder-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-transparent transition-all text-sm"
                />
                <button
                  onClick={() => {
                    if (replyText.trim()) {
                      handleReply(selectedMessage.id);
                    }
                  }}
                  disabled={!replyText.trim()}
                  className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all disabled:opacity-40 disabled:cursor-not-allowed active:scale-95"
                  title="Enviar (Enter)"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal - Nuevo Mensaje */}
      {showNewMessageModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-card rounded-2xl border border-border/50 max-w-lg w-full max-h-[70vh] overflow-hidden flex flex-col shadow-2xl">
            {/* Header Modal */}
            <div className="bg-gradient-to-r from-primary via-primary to-primary/90 px-5 py-3 flex items-center justify-between text-white">
              <h2 className="font-bold text-base">Nuevo Mensaje</h2>
              <button
                onClick={() => setShowNewMessageModal(false)}
                className="p-1.5 hover:bg-white/20 rounded-lg transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Form */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              <div>
                <label className="text-xs font-semibold text-foreground block mb-1.5">Para</label>
                <input
                  type="text"
                  placeholder="Destinatario..."
                  value={newMessageData.to}
                  onChange={(e) => setNewMessageData({ ...newMessageData, to: e.target.value })}
                  className="w-full px-3 py-2 bg-muted border border-border/50 rounded-lg text-sm text-foreground placeholder-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-foreground block mb-1.5">Asunto</label>
                <input
                  type="text"
                  placeholder="Asunto..."
                  value={newMessageData.subject}
                  onChange={(e) => setNewMessageData({ ...newMessageData, subject: e.target.value })}
                  className="w-full px-3 py-2 bg-muted border border-border/50 rounded-lg text-sm text-foreground placeholder-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-foreground block mb-1.5">Mensaje</label>
                <textarea
                  placeholder="Escribe tu mensaje..."
                  value={newMessageData.content}
                  onChange={(e) => setNewMessageData({ ...newMessageData, content: e.target.value })}
                  className="w-full px-3 py-2 bg-muted border border-border/50 rounded-lg text-sm text-foreground placeholder-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-transparent transition-all resize-none"
                  rows={4}
                />
              </div>
            </div>

            {/* Actions */}
            <div className="border-t border-border/50 bg-background/50 px-4 py-3 flex gap-2 justify-end">
              <button
                onClick={() => setShowNewMessageModal(false)}
                className="px-3 py-1.5 text-sm border border-border rounded-lg hover:bg-muted transition-colors font-medium text-foreground"
              >
                Cancelar
              </button>
              <button
                onClick={handleNewMessage}
                className="flex items-center gap-2 px-3 py-1.5 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all font-medium"
              >
                <Send className="w-3.5 h-3.5" />
                Enviar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
