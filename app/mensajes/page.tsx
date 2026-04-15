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

      {/* Modal - Ver Conversación */}
      {showModal && selectedMessage && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-card rounded-2xl border border-border max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col shadow-2xl">
            {/* Header Modal */}
            <div className="bg-gradient-to-r from-primary/10 to-primary/5 border-b border-border p-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-foreground">{selectedMessage.from}</h2>
                <p className="text-sm text-muted-foreground">{selectedMessage.subject}</p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-foreground" />
              </button>
            </div>

            {/* Mensaje */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-4">
                <div className="bg-background rounded-xl p-4 border border-border/50">
                  <p className="text-foreground leading-relaxed">{selectedMessage.message}</p>
                  <p className="text-xs text-muted-foreground mt-3">{selectedMessage.time}</p>
                </div>
              </div>
            </div>

            {/* Reply Section */}
            <div className="border-t border-border bg-background/50 p-6 space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground block mb-2">Respuesta</label>
                <textarea
                  placeholder="Escribe tu respuesta aquí..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className="w-full px-4 py-3 bg-card border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                  rows={4}
                />
              </div>

              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors font-medium text-foreground"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => {
                    handleReply(selectedMessage.id);
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all font-medium"
                >
                  <Send className="w-4 h-4" />
                  Enviar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal - Nuevo Mensaje */}
      {showNewMessageModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-card rounded-2xl border border-border max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col shadow-2xl">
            {/* Header Modal */}
            <div className="bg-gradient-to-r from-primary/10 to-primary/5 border-b border-border p-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-foreground">Nuevo Mensaje</h2>
              <button
                onClick={() => setShowNewMessageModal(false)}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-foreground" />
              </button>
            </div>

            {/* Form */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground block mb-2">Para</label>
                <input
                  type="text"
                  placeholder="Seleccionar destinatario..."
                  value={newMessageData.to}
                  onChange={(e) => setNewMessageData({ ...newMessageData, to: e.target.value })}
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground block mb-2">Asunto</label>
                <input
                  type="text"
                  placeholder="Asunto del mensaje..."
                  value={newMessageData.subject}
                  onChange={(e) => setNewMessageData({ ...newMessageData, subject: e.target.value })}
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground block mb-2">Mensaje</label>
                <textarea
                  placeholder="Escribe tu mensaje aquí..."
                  value={newMessageData.content}
                  onChange={(e) => setNewMessageData({ ...newMessageData, content: e.target.value })}
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                  rows={6}
                />
              </div>
            </div>

            {/* Actions */}
            <div className="border-t border-border bg-background/50 p-6 flex gap-3 justify-end">
              <button
                onClick={() => setShowNewMessageModal(false)}
                className="px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors font-medium text-foreground"
              >
                Cancelar
              </button>
              <button
                onClick={handleNewMessage}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all font-medium"
              >
                <Send className="w-4 h-4" />
                Enviar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
