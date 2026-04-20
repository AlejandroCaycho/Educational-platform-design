'use client';

import React, { useState } from 'react';
import { MessageSquare, Send, Plus, Search, Trash2, X, MoreVertical, PhoneOff, Phone, Video, Info, Paperclip, Smile } from 'lucide-react';

const messagesData = [
  {
    id: 1,
    from: 'Profa. Daniela García',
    avatar: 'DG',
    subject: 'Excelente desempeño en Matemáticas',
    message: 'Carlos ha mostrado un excelente progreso en Matemáticas este mes. Felicidades por su esfuerzo.',
    time: 'Hoy 2:30 PM',
    read: false,
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
    messages: [
      { id: 1, from: 'Dirección EduNova', text: 'Le recordamos que la jornada de padres será el 15 de abril a las 3:00 PM. Se requiere asistencia confirmada.', time: 'Ayer 10:00 AM', sender: 'other' },
    ]
  },
  {
    id: 3,
    from: 'Profa. Juan Morales',
    avatar: 'JM',
    subject: 'Tareas adicionales de refuerzo',
    message: 'He enviado tareas adicionales de refuerzo en divisiones.',
    time: '2 días atrás',
    read: true,
    messages: [
      { id: 1, from: 'Profa. Juan Morales', text: 'He enviado tareas adicionales de refuerzo en divisiones.', time: '2 días atrás', sender: 'other' },
    ]
  },
  {
    id: 4,
    from: 'Coordinadora Patricia',
    avatar: 'CP',
    subject: 'Justificación de ausencia aceptada',
    message: 'La justificación de ausencia ha sido revisada y aceptada.',
    time: '3 días atrás',
    read: true,
    messages: [
      { id: 1, from: 'Coordinadora Patricia', text: 'La justificación de ausencia ha sido revisada y aceptada. Gracias por proporcionar la documentación.', time: '3 días atrás', sender: 'other' },
    ]
  },
];

export default function Mensajes() {
  const [messages, setMessages] = useState(messagesData);
  const [selectedMessage, setSelectedMessage] = useState<any>(messages[0]);
  const [replyText, setReplyText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleDeleteMessage = (id: number) => {
    const updatedMessages = messages.filter(m => m.id !== id);
    setMessages(updatedMessages);
    if (selectedMessage?.id === id) {
      setSelectedMessage(updatedMessages[0] || null);
    }
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
      setSelectedMessage({
        ...selectedMessage,
        messages: [...selectedMessage.messages, newMessage]
      });
      setReplyText('');
    }
  };

  const filteredMessages = messages.filter(msg =>
    msg.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
    msg.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-screen flex flex-col bg-background">
      <div className="flex-1 flex gap-4 p-5 md:p-6">
      {/* Sidebar - Lista de Chats */}
      <div className="w-full md:w-80 flex flex-col rounded-2xl border border-border/50 bg-gradient-to-br from-card to-card/80 overflow-hidden shadow-sm h-full">
        {/* Header Sidebar */}
        <div className="px-4 py-4 border-b border-border/50 flex-shrink-0">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-foreground">Mensajes</h1>
            <button
              className="p-2 hover:bg-muted/50 rounded-lg transition-colors"
              title="Nuevo mensaje"
            >
              <Plus className="w-5 h-5 text-primary" />
            </button>
          </div>
          
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-muted/50 border border-border/30 rounded-lg text-foreground placeholder-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-transparent transition-all text-sm"
            />
          </div>
        </div>

        {/* Messages List */}
        <div className="flex-1 overflow-y-auto space-y-1 p-2">
          {filteredMessages.map(msg => (
            <button
              key={msg.id}
              onClick={() => setSelectedMessage(msg)}
              className={`w-full group relative rounded-xl p-3 transition-all text-left hover:bg-muted/50 ${
                selectedMessage?.id === msg.id ? 'bg-primary/10 border border-primary/30' : ''
              }`}
            >
              <div className="flex items-start gap-3">
                {/* Avatar */}
                <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                  selectedMessage?.id === msg.id 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-gradient-to-br from-primary/30 to-primary/10 text-primary border border-primary/20'
                }`}>
                  {msg.avatar}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className={`font-semibold truncate ${!msg.read ? 'font-bold' : 'font-medium'}`}>
                      {msg.from}
                    </h3>
                    {!msg.read && <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>}
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{msg.subject}</p>
                  <p className="text-xs text-muted-foreground/70 line-clamp-1">{msg.message}</p>
                </div>
              </div>

              {/* Delete button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteMessage(msg.id);
                }}
                className="absolute top-3 right-3 p-1.5 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive/20 rounded-lg"
                title="Eliminar"
              >
                <Trash2 className="w-4 h-4 text-destructive" />
              </button>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area - Conversación */}
      {selectedMessage ? (
        <div className="hidden md:flex flex-1 flex-col rounded-2xl border border-border/50 bg-gradient-to-br from-card to-card/80 overflow-hidden shadow-sm h-full">
          {/* Chat Header */}
          <div className="px-6 py-4 border-b border-border/50 flex items-center justify-between flex-shrink-0 bg-gradient-to-r from-primary/5 to-primary/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center border border-primary/20 font-bold text-sm">
                {selectedMessage.avatar}
              </div>
              <div>
                <h2 className="font-bold text-foreground">{selectedMessage.from}</h2>
                <p className="text-xs text-muted-foreground/70">Activo</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-muted/50 rounded-lg transition-colors text-muted-foreground hover:text-foreground">
                <Phone className="w-4 h-4" />
              </button>
              <button className="p-2 hover:bg-muted/50 rounded-lg transition-colors text-muted-foreground hover:text-foreground">
                <Video className="w-4 h-4" />
              </button>
              <button className="p-2 hover:bg-muted/50 rounded-lg transition-colors text-muted-foreground hover:text-foreground">
                <Info className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 flex flex-col">
            {/* Date separator */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-border/30"></div>
              <p className="text-xs text-muted-foreground/70 font-medium whitespace-nowrap">Hoy</p>
              <div className="flex-1 h-px bg-border/30"></div>
            </div>

            {/* Chat messages */}
            {selectedMessage.messages?.map(msg => (
              <div key={msg.id} className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.sender === 'other' && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center flex-shrink-0 border border-primary/20 text-xs font-bold">
                    {selectedMessage.avatar}
                  </div>
                )}
                
                <div className={`flex flex-col gap-1 max-w-xs ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                  <div className={`rounded-2xl px-4 py-2 shadow-sm ${
                    msg.sender === 'user'
                      ? 'bg-primary text-primary-foreground rounded-br-sm'
                      : 'bg-muted text-foreground rounded-bl-sm'
                  }`}>
                    <p className="text-sm break-words">{msg.text}</p>
                  </div>
                  <span className="text-xs text-muted-foreground/70 px-2">{msg.time}</span>
                </div>
              </div>
            ))}

            <div className="flex-1"></div>
          </div>

          {/* Input Area */}
          <div className="px-6 py-4 border-t border-border/50 flex items-end gap-2 flex-shrink-0 bg-muted/20">
            <button className="p-2 hover:bg-muted/50 rounded-lg transition-colors text-muted-foreground hover:text-foreground">
              <Paperclip className="w-4 h-4" />
            </button>
            
            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleReply();
                }
              }}
              placeholder="Escribe un mensaje..."
              rows={1}
              className="flex-1 px-3 py-2 bg-background/80 border border-border/30 rounded-lg text-foreground placeholder-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-transparent transition-all text-sm resize-none max-h-24"
            />
            
            <button className="p-2 hover:bg-muted/50 rounded-lg transition-colors text-muted-foreground hover:text-foreground">
              <Smile className="w-4 h-4" />
            </button>

            <button
              onClick={handleReply}
              disabled={!replyText.trim()}
              className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 flex-shrink-0"
              title="Enviar (Enter)"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div className="hidden md:flex flex-1 rounded-2xl border border-border/50 bg-gradient-to-br from-card to-card/80 items-center justify-center h-full">
          <div className="text-center space-y-3">
            <MessageSquare className="w-12 h-12 text-muted-foreground/30 mx-auto" />
            <p className="text-muted-foreground font-medium">Selecciona un chat</p>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}
