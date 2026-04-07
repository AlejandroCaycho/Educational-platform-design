'use client';

import React, { useState } from 'react';
import { MessageSquare, Send, Plus, Search, Trash2 } from 'lucide-react';

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
  const [selectedMessage, setSelectedMessage] = useState<number | null>(null);
  const [replyText, setReplyText] = useState('');

  const handleDeleteMessage = (id: number) => {
    setMessages(messages.filter(m => m.id !== id));
  };

  const handleReply = (id: number) => {
    if (replyText.trim()) {
      console.log(`Respuesta a mensaje ${id}: ${replyText}`);
      setReplyText('');
    }
  };

  return (
    <div className="p-6 md:p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Mensajes</h1>
        <p className="text-muted-foreground">Comunicación con docentes y administración</p>
      </div>

      {/* Search and Actions */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar mensajes..."
            className="w-full pl-10 pr-4 py-2 bg-card border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <button className="flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity whitespace-nowrap">
          <Plus className="w-4 h-4" />
          Nuevo Mensaje
        </button>
      </div>

      {/* Messages */}
      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <div className="divide-y divide-border">
          {messages.map(msg => (
            <div key={msg.id} className="p-4 hover:bg-muted transition-colors cursor-pointer">
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className={`font-semibold ${msg.read ? 'text-foreground' : 'text-foreground font-bold'}`}>
                      {msg.from}
                    </h3>
                    {!msg.read && <div className="w-2 h-2 bg-primary rounded-full"></div>}
                  </div>
                  <p className="text-sm font-medium text-foreground mb-1">{msg.subject}</p>
                  <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{msg.message}</p>
                  <p className="text-xs text-muted-foreground">{msg.time}</p>
                </div>
                <button
                  onClick={() => handleDeleteMessage(msg.id)}
                  className="p-2 hover:bg-destructive/20 rounded transition-colors"
                >
                  <Trash2 className="w-4 h-4 text-destructive" />
                </button>
              </div>

              {selectedMessage === msg.id && (
                <div className="mt-4 pt-4 border-t border-border">
                  <div className="bg-background p-4 rounded-lg mb-3 max-h-40 overflow-y-auto">
                    <p className="text-foreground text-sm">{msg.message}</p>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Escribir respuesta..."
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      className="flex-1 px-3 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <button
                      onClick={() => {
                        handleReply(msg.id);
                        setSelectedMessage(null);
                      }}
                      className="p-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {selectedMessage !== msg.id && (
                <button
                  onClick={() => setSelectedMessage(msg.id)}
                  className="mt-3 text-primary text-sm font-semibold hover:underline"
                >
                  Responder
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
