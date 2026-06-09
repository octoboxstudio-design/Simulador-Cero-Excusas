import { Briefcase, Users, Heart, Coffee, Wallet, type LucideIcon } from 'lucide-react';

export type RelationId = 'trabajo' | 'familia' | 'pareja' | 'amigos' | 'financiero';
export type ToneId = 'normal' | 'insistente' | 'culpa';

export interface RelationType {
  id: RelationId;
  label: string;
  icon: LucideIcon;
}

export interface ToneType {
  id: ToneId;
  label: string;
  desc: string;
}

export const relationTypes: RelationType[] = [
  { id: 'trabajo', label: 'Trabajo / Jefe', icon: Briefcase },
  { id: 'familia', label: 'Familia', icon: Users },
  { id: 'pareja', label: 'Pareja', icon: Heart },
  { id: 'amigos', label: 'Amigos / Social', icon: Coffee },
  { id: 'financiero', label: 'Dinero / Legal', icon: Wallet }
];

export const toneTypes: ToneType[] = [
  { id: 'normal', label: 'Petición Normal', desc: 'Simplemente te pidieron un favor.' },
  { id: 'insistente', label: 'Son Insistentes', desc: 'Ya dudaste, pero no aceptan un no.' },
  { id: 'culpa', label: 'Uso de Culpa', desc: 'Chantaje emocional o pasivo-agresivo.' }
];

export const scriptsDB: Record<RelationId, Record<ToneId, { diplomatic: string; direct: string; boundary: string }>> = {
  trabajo: {
    normal: {
      diplomatic: "Gracias por pensar en mí para esto. Actualmente mi capacidad está al límite con otras prioridades, así que no podré tomarlo.",
      direct: "No puedo comprometerme con este proyecto en este momento. Te aviso si mi disponibilidad cambia en el futuro.",
      boundary: "Tengo mi agenda bloqueada para esta semana. Si es urgente, hablemos sobre qué otra tarea dejamos en pausa para darle espacio a esta."
    },
    insistente: {
      diplomatic: "Entiendo que es importante, pero mi respuesta sigue siendo no. Necesito enfocarme en los entregables actuales para no comprometer la calidad.",
      direct: "Como mencioné antes, no tengo disponibilidad. Por favor, asignemos esto a otra persona.",
      boundary: "Mi carga de trabajo actual no es negociable. Si me obligas a tomar esto, las otras métricas van a caer. Tú decides qué priorizamos."
    },
    culpa: {
      diplomatic: "Sé que el equipo está bajo presión, pero asumir esto me llevaría al burnout. Puedo ayudar orientando a quien lo tome, pero no ejecutarlo.",
      direct: "No puedo asumir la responsabilidad de esta urgencia. No estoy disponible para trabajar horas extra en este momento.",
      boundary: "Tratar de hacerme sentir mal no cambiará mi disponibilidad. Mi respuesta es no y necesito que respetes mi tiempo de descanso."
    }
  },
  familia: {
    normal: {
      diplomatic: "Me encantaría ayudar, pero esta vez no me será posible. Espero que lo resuelvan pronto.",
      direct: "No puedo asistir/ayudar en esta ocasión. Les mando un abrazo.",
      boundary: "Tengo otros compromisos personales este fin de semana, así que no cuenten conmigo esta vez."
    },
    insistente: {
      diplomatic: "Sé que me lo han pedido varias veces, pero de verdad no puedo. Por favor, no insistan más con este tema.",
      direct: "Mi decisión es firme. No voy a poder hacerlo, por favor busquemos otra alternativa.",
      boundary: "Ya di mi respuesta y no va a cambiar aunque sigamos hablando de esto. Cambiemos de tema."
    },
    culpa: {
      diplomatic: "Entiendo que te sientas frustrado/a, pero mi 'no' no significa que no te quiera. Simplemente no puedo asumir esto ahora.",
      direct: "No voy a aceptar que me hagas sentir culpable por cuidar mi propio tiempo/dinero. Mi respuesta es no.",
      boundary: "El chantaje emocional daña nuestra relación. Te digo que no porque necesito cuidarme, te pido que respetes mi límite sin dramatizar."
    }
  },
  pareja: {
    normal: {
      diplomatic: "Entiendo que quieras esto, pero en este momento no me siento cómodo/a haciéndolo. ¿Podemos buscar un punto medio?",
      direct: "No estoy de acuerdo con esto y prefiero que no lo hagamos.",
      boundary: "Esto es importante para ti, pero para mí es un límite claro. No voy a participar en esto."
    },
    insistente: {
      diplomatic: "Siento que me estás presionando. Ya te expliqué por qué no quiero hacerlo, por favor respeta mi espacio.",
      direct: "Cuanto más insistes, más me alejo. Ya te dije que no, por favor detente.",
      boundary: "No voy a ceder por insistencia. Si seguimos por este camino, prefiero que dejemos esta conversación para otro momento."
    },
    culpa: {
      diplomatic: "Decir que no a esto no significa que no te ame. Significa que tengo necesidades que también importan.",
      direct: "No es justo que uses mis sentimientos para conseguir lo que quieres. Me mantengo en mi posición.",
      boundary: "La manipulación es inaceptable para mí. Te pido que analices por qué necesitas hacerme sentir mal para que yo haga lo que tú quieres. Mi respuesta es no."
    }
  },
  amigos: {
    normal: {
      diplomatic: "Suena genial, pero ando con poca energía estos días. Voy a pasar esta vez, ¡disfruten mucho!",
      direct: "No podré ir/ayudarte en esta ocasión. Hablamos en la semana.",
      boundary: "Mi presupuesto/tiempo está muy medido ahora mismo. No cuenten conmigo para este plan."
    },
    insistente: {
      diplomatic: "De verdad valoro que quieran que esté, pero mi respuesta sigue siendo no. Necesito este tiempo para mí.",
      direct: "Chicos, ya dije que no. No me sigan insistiendo, porfa.",
      boundary: "Cuando digo que no, es no. Presionarme solo hace que me den menos ganas de ir/ayudar."
    },
    culpa: {
      diplomatic: "Sé que contaban conmigo, pero mi salud mental va primero. Un buen amigo entendería que a veces necesito aislararme/descansar.",
      direct: "No me voy a sentir mal por priorizarme. Si eso les molesta, es algo que ustedes deben revisar.",
      boundary: "Intentar hacerme sentir el 'malo' del grupo porque hoy elijo decir no, no es de amigos. No voy, y punto."
    }
  },
  financiero: {
    normal: {
      diplomatic: "Me encantaría apoyarte, pero tengo por regla estricta no mezclar mis finanzas o bienes con mis relaciones personales. Espero que lo entiendas.",
      direct: "No puedo prestarte dinero/el auto ni ser tu garante. Mis políticas financieras no me lo permiten en este momento.",
      boundary: "No participo en préstamos personales ni asumo responsabilidades legales de terceros. Es una decisión definitiva que aplico con todos sin excepción."
    },
    insistente: {
      diplomatic: "Entiendo la urgencia de tu situación, pero mi decisión de no involucrar mi patrimonio es firme. Espero que encuentres otra solución pronto.",
      direct: "Como te dije, no puedo hacerlo. Por favor, no me insistas más con este tema porque mi respuesta no va a cambiar.",
      boundary: "Presionarme no hará que arriesgue mi seguridad financiera. El tema está cerrado y te pido que no volvamos a tocarlo."
    },
    culpa: {
      diplomatic: "Decirte que no, no significa que no me importe tu situación. Simplemente no puedo poner en riesgo mi propia tranquilidad y seguridad.",
      direct: "No voy a aceptar que me hagas sentir mal por proteger mi patrimonio y el fruto de mi trabajo. Mi respuesta es un no definitivo.",
      boundary: "Usar la culpa para que arriesgue mi dinero o me comprometa legalmente es cruzar un límite inaceptable. No voy a ceder ante chantajes emocionales."
    }
  }
};
