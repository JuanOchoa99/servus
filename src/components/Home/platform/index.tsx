"use client";
import { useState, useRef, useCallback, useEffect } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

interface AvailableDay {
  date: Date;
  label: string;
  dayOfWeek: string;
}

interface TimeSlot {
  start: number;
  end: number;
  label: string;
}

interface BusySlot {
  start: string;
  end: string;
}

const Platform = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userEmail, setUserEmail] = useState<string>('');
  const [emailConfirmed, setEmailConfirmed] = useState(false);
  const [selectedDay, setSelectedDay] = useState<AvailableDay | null>(null);
  const [busySlots, setBusySlots] = useState<BusySlot[]>([]);
  const [loading, setLoading] = useState(false);
  const [isLoadingAvailability, setIsLoadingAvailability] = useState(false);
  const [availableDays, setAvailableDays] = useState<AvailableDay[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [createdEventLink, setCreatedEventLink] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const modalRef = useRef<HTMLDivElement>(null);

  // Horarios disponibles por día (7-8 AM y 4-7 PM)
  const timeSlots: TimeSlot[] = [
    { start: 7, end: 8, label: "7:00 AM" },
    { start: 16, end: 17, label: "4:00 PM" },
    { start: 17, end: 18, label: "5:00 PM" },
    { start: 18, end: 19, label: "6:00 PM" },
  ];

  // Verificar si un horario está ocupado consultando Google Calendar
  const isTimeSlotBooked = useCallback((day: AvailableDay, timeSlot: TimeSlot): boolean => {
    const slotStart = new Date(day.date);
    slotStart.setHours(timeSlot.start, 0, 0, 0);
    
    const slotEnd = new Date(day.date);
    slotEnd.setHours(timeSlot.end, 0, 0, 0);

    // Verificar si hay algún slot ocupado que se superponga
    return busySlots.some((busySlot) => {
      const busyStart = new Date(busySlot.start);
      const busyEnd = new Date(busySlot.end);
      
      // Verificar si hay superposición
      return (
        (slotStart >= busyStart && slotStart < busyEnd) ||
        (slotEnd > busyStart && slotEnd <= busyEnd) ||
        (slotStart <= busyStart && slotEnd >= busyEnd)
      );
    });
  }, [busySlots]);

  // Función para verificar si un día tiene horarios disponibles
  const dayHasAvailableSlots = useCallback((day: AvailableDay): boolean => {
    // Verificar si al menos un horario está disponible
    return timeSlots.some((timeSlot) => !isTimeSlotBooked(day, timeSlot));
  }, [isTimeSlotBooked, timeSlots]);

  // Función para generar días disponibles (solo días laborables)
  const generateAllDays = useCallback((): AvailableDay[] => {
    const days: AvailableDay[] = [];
    const today = new Date();

    // Generar días para los próximos 14 días (para tener suficientes opciones después de filtrar)
    for (let dayOffset = 1; dayOffset <= 14; dayOffset++) {
      const date = new Date(today);
      date.setDate(today.getDate() + dayOffset);
      date.setHours(0, 0, 0, 0);

      // Obtener el día de la semana (0 = domingo, 6 = sábado)
      const dayOfWeek = date.getDay();

      // Saltar fines de semana (sábado = 6, domingo = 0)
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        continue;
      }

      // Formatear etiqueta
      let dateLabel = "";
      if (dayOffset === 1) {
        dateLabel = "Tomorrow";
      } else if (dayOffset === 2) {
        dateLabel = "Day after tomorrow";
      } else {
        dateLabel = date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
      }

      const dayName = date.toLocaleDateString("en-US", { weekday: "long" });

      days.push({
        date,
        label: dateLabel,
        dayOfWeek: dayName,
      });
    }

    return days;
  }, []);

  // Función para generar días del calendario del mes actual (siempre 6 semanas para tamaño fijo)
  const generateCalendarDays = useCallback((): { date: Date; isWeekend: boolean; isPast: boolean; availableDay: AvailableDay | null }[] => {
    const calendarDays: { date: Date; isWeekend: boolean; isPast: boolean; availableDay: AvailableDay | null }[] = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Obtener el primer y último día del mes actual
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    // Obtener el primer día de la semana del mes (para alinear el calendario)
    const firstDayOfWeek = firstDayOfMonth.getDay();

    // Obtener todos los días disponibles para crear el mapa
    const allAvailableDays = generateAllDays();
    const availableDaysMap = new Map<string, AvailableDay>();
    allAvailableDays.forEach(day => {
      const key = day.date.toISOString().split('T')[0];
      availableDaysMap.set(key, day);
    });

    // Agregar días vacíos al inicio si el mes no comienza en domingo (del mes anterior)
    for (let i = 0; i < firstDayOfWeek; i++) {
      const prevMonthDate = new Date(year, month, -firstDayOfWeek + i + 1);
      prevMonthDate.setHours(0, 0, 0, 0);
      calendarDays.push({
        date: prevMonthDate,
        isWeekend: prevMonthDate.getDay() === 0 || prevMonthDate.getDay() === 6,
        isPast: true,
        availableDay: null,
      });
    }

    // Generar todos los días del mes actual
    for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
      const date = new Date(year, month, day);
      date.setHours(0, 0, 0, 0);

      const dayOfWeek = date.getDay();
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
      const isPast = date < today;
      const key = date.toISOString().split('T')[0];
      const availableDay = availableDaysMap.get(key) || null;

      calendarDays.push({
        date,
        isWeekend,
        isPast,
        availableDay,
      });
    }

    // Completar hasta tener exactamente 6 semanas (42 días) para tamaño fijo
    const daysInCalendar = calendarDays.length;
    const daysNeeded = 42 - daysInCalendar; // 6 semanas * 7 días = 42 días
    
    if (daysNeeded > 0) {
      const nextMonth = month + 1;
      for (let i = 1; i <= daysNeeded; i++) {
        const date = new Date(year, nextMonth, i);
        date.setHours(0, 0, 0, 0);
        calendarDays.push({
          date,
          isWeekend: date.getDay() === 0 || date.getDay() === 6,
          isPast: false,
          availableDay: null,
        });
      }
    }

    return calendarDays;
  }, [currentMonth, generateAllDays]);

  // Cargar todos los horarios ocupados para los próximos días (en background)
  const loadBusySlots = useCallback(async () => {
    try {
      const today = new Date();
      const endDate = new Date();
      endDate.setDate(today.getDate() + 14);
      
      // Obtener eventos completos para verificar cancelados (sin bloquear UI)
      const eventsResponse = await fetch('/api/calendar/get-events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          startDate: today.toISOString(),
          endDate: endDate.toISOString(),
        }),
      });

      // Check if response is JSON before parsing
      const contentType = eventsResponse.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        // API route not available (likely static export)
        console.warn('Calendar API not available. Using static export mode.');
        setBusySlots([]);
        const allDays = generateAllDays();
        setAvailableDays(allDays.slice(0, 8));
        return;
      }

      if (!eventsResponse.ok) {
        const errorData = await eventsResponse.json().catch(() => ({}));
        // Si hay error de configuración, solo loguear (no mostrar al usuario)
        if (eventsResponse.status === 401 || eventsResponse.status === 500) {
          console.warn('Calendar API not configured:', errorData.message || 'Check your .env.local file');
        }
        // Continuar sin bloquear - mostrar todos los días como disponibles
        setBusySlots([]);
        const allDays = generateAllDays();
        setAvailableDays(allDays.slice(0, 8));
        return;
      }

      const eventsData = await eventsResponse.json();
      const events = eventsData.events || [];

      // Convertir eventos a busy slots
      // La API ya filtra eventos cancelados con menos de 2 horas, así que solo necesitamos
      // incluir eventos confirmados o cancelados (que ya tienen más de 2 horas)
      const busySlotsFromEvents = events
        .filter((event: any) => {
          // Incluir eventos confirmados
          if (event.status === 'confirmed') return true;
          // Incluir eventos cancelados (la API ya filtró los que tienen menos de 2 horas)
          if (event.status === 'cancelled') return true;
          // Incluir eventos tentativos también
          return event.status === 'tentative';
        })
        .map((event: any) => ({
          start: event.start,
          end: event.end,
        }));

      setBusySlots(busySlotsFromEvents);
    } catch (error) {
      console.error('Error loading busy slots:', error);
      // Continuar sin bloquear - mostrar todos los días como disponibles
      setBusySlots([]);
      const allDays = generateAllDays();
      setAvailableDays(allDays.slice(0, 8));
    }
  }, [generateAllDays]);

  // Cargar horarios ocupados cuando se abre el modal (en background, sin esperar confirmación de email)
  useEffect(() => {
    if (isModalOpen) {
      // Inicializar días disponibles vacíos mientras cargamos
      setAvailableDays([]);
      setIsLoadingAvailability(true);
      
      // Cargar en background sin bloquear la UI (incluso antes de confirmar email)
      loadBusySlots().finally(() => {
        setIsLoadingAvailability(false);
      });
    } else {
      // Limpiar cuando se cierra el modal
      setBusySlots([]);
      setAvailableDays([]);
      setSelectedDay(null);
      setUserEmail('');
      setEmailConfirmed(false);
      setIsCreating(false);
      setIsSuccess(false);
      setCreatedEventLink(null);
    }
  }, [isModalOpen, loadBusySlots]);

  // Actualizar días disponibles cuando cambian los busy slots (después de cargar)
  useEffect(() => {
    // Solo actualizar si ya tenemos los busy slots cargados
    if (busySlots.length >= 0) { // Siempre ejecutar, incluso si está vacío
      const allDays = generateAllDays();
      const filteredDays = allDays
        .filter((day) => dayHasAvailableSlots(day))
        .slice(0, 8); // Limitar a 8 días (4 filas x 2 columnas)
      setAvailableDays(filteredDays);
    }
  }, [busySlots, dayHasAvailableSlots]);

  // Manejar clic fuera del modal
  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setIsModalOpen(false);
      }
    },
    []
  );

  useEffect(() => {
    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "";
    };
  }, [isModalOpen, handleClickOutside]);


  // Manejar selección de día
  const handleDaySelect = (day: AvailableDay) => {
    setSelectedDay(day);
  };

  // Manejar selección de horario
  const handleTimeSlotSelect = async (timeSlot: TimeSlot) => {
    if (!selectedDay) return;

    // Verificar si ya está ocupado
    if (isTimeSlotBooked(selectedDay, timeSlot)) {
      return;
    }

    const startDate = new Date(selectedDay.date);
    startDate.setHours(timeSlot.start, 0, 0, 0);

    const endDate = new Date(selectedDay.date);
    endDate.setHours(timeSlot.end, 0, 0, 0);

    // Mostrar pantalla de loading
    setIsCreating(true);
    setLoading(true);

    try {
      // Crear el evento automáticamente en Google Calendar
      const response = await fetch('/api/calendar/create-event', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
          attendees: [userEmail, 'ochoaortizj@gmail.com', 'moosescn20@gmail.com'],
        }),
      });

      // Check if response is JSON before parsing
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        throw new Error(`API endpoint returned HTML instead of JSON. This usually means the API route is not available in production. Response: ${text.substring(0, 100)}...`);
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to create event');
      }

      // Mostrar pantalla de éxito
      setIsCreating(false);
      setIsSuccess(true);
      setCreatedEventLink(data.event?.htmlLink || null);
      
      // Cerrar el modal después de 3 segundos
      setTimeout(() => {
        setIsModalOpen(false);
        setSelectedDay(null);
        setUserEmail('');
        setEmailConfirmed(false);
        setIsCreating(false);
        setIsSuccess(false);
        setCreatedEventLink(null);
      }, 3000);
      
    } catch (error: any) {
      console.error('Error creating event:', error);
      // En caso de error, volver a la vista de selección de horario
      setIsCreating(false);
      setIsSuccess(false);
      // Podrías agregar un estado de error aquí si quieres mostrar un mensaje
    } finally {
      setLoading(false);
    }
  };

  // Validar correo electrónico
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Manejar confirmación de correo
  const handleEmailConfirm = () => {
    if (!userEmail.trim()) {
      alert('Please enter your email address');
      return;
    }
    
    if (!isValidEmail(userEmail)) {
      alert('Please enter a valid email address');
      return;
    }

    setEmailConfirmed(true);
  };

  // Resetear al cerrar el modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDay(null);
    setUserEmail('');
    setEmailConfirmed(false);
    setIsCreating(false);
    setIsSuccess(false);
    setCreatedEventLink(null);
    setCurrentMonth(new Date()); // Resetear al mes actual
  };

  // Navegar entre meses
  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  // Formatear nombre del mes y año
  const getMonthYearLabel = () => {
    return currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  return (
    <section className="sm:px-12 pt-12 relative z-1">
      <div className="container mx-auto lg:max-w-screen-xl px-4">
        <div className="bg-section bg-opacity-10 px-16 py-14 rounded-3xl border-2 border-opacity-20 border-section grid grid-cols-12 items-center before:content-[''] before:absolute relative before:w-96 before:h-64 before:logo-v before:bg-no-repeat before:-bottom-11 overflow-hidden lg:before:right-48 before:-z-1 before:opacity-10 ">
          <div className="lg:col-span-8 col-span-12">
            <h2 className="text-white sm:text-40 text-30 mb-6">
              Tell your idea to the <span className="text-primary">servus</span>{" "}
              team.
            </h2>
            <p className="text-muted text-opacity-60 text-18">
              Schedule a meeting through Google and a person 
              <br /> from the team will listen to your needs 
              <br /> and explain how we can work on it.
            </p>
          </div>
          <div className="lg:col-span-4 col-span-12">
            <div className="flex lg:justify-end lg:mt-0 mt-7 justify-center gap-3 flex-wrap">
              <button
                onClick={() => setIsModalOpen(true)}
                className="text-darkmode bg-primary border border-primary py-3 px-5 rounded-lg sm:text-21 text-18 font-medium hover:bg-transparent hover:text-primary transition-colors touch-manipulation active:scale-95 relative z-10"
                aria-label="Book a meeting"
              >
                Book a meeting
              </button>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-tealGreen to-charcoalGray sm:w-50 w-96 sm:h-50 h-96 rounded-full sm:-bottom-80 bottom-0 blur-400 z-0 absolute sm:-left-48 opacity-60"></div>
      </div>

      {/* Modal de selección de horarios */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[9999] p-2 sm:p-4 overflow-y-auto pt-24 sm:pt-28 md:pt-32 lg:pt-36">
          <div
            ref={modalRef}
            className="relative w-full max-w-3xl my-2 sm:my-4 md:my-6 overflow-hidden rounded-xl sm:rounded-2xl px-4 sm:px-6 md:px-8 lg:px-10 pt-4 sm:pt-6 md:pt-8 pb-4 sm:pb-5 md:pb-6 bg-dark_grey bg-opacity-95 backdrop-blur-lg flex flex-col shadow-2xl border border-section border-opacity-30 max-h-[calc(100vh-5rem)] sm:max-h-[calc(100vh-6rem)] md:max-h-[calc(100vh-7rem)]"
          >

            {!emailConfirmed ? (
              // Vista de ingreso de correo electrónico
              <>
                <div className="text-center mb-4 sm:mb-6 md:mb-8 flex-shrink-0 pt-0.5 sm:pt-1">
                  <h3 className="text-white text-22 sm:text-26 md:text-32 lg:text-36 font-semibold mb-1 sm:mb-2">
                    Enter your email
                  </h3>
                  <p className="text-muted text-opacity-70 text-12 sm:text-14 md:text-16">
                    We'll send you a calendar invitation
                  </p>
                </div>

                <div className="flex-1 flex flex-col justify-center min-h-0">
                  <div className="space-y-4 sm:space-y-6">
                    <div>
                      <label htmlFor="email" className="block text-white text-14 sm:text-16 mb-2">
                        Email address
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            handleEmailConfirm();
                          }
                        }}
                        placeholder="your.email@example.com"
                        className="w-full bg-dark_grey border-2 border-section border-opacity-30 rounded-lg sm:rounded-xl px-4 sm:px-5 py-3 sm:py-4 text-white text-14 sm:text-16 placeholder:text-muted placeholder:text-opacity-50 focus:outline-none focus:border-primary transition-colors touch-manipulation"
                        autoFocus
                      />
                    </div>
                    <button
                      onClick={handleEmailConfirm}
                      disabled={!userEmail.trim() || !isValidEmail(userEmail)}
                      className="w-full bg-primary text-darkmode py-3 sm:py-4 px-6 rounded-lg sm:rounded-xl text-16 sm:text-18 font-semibold hover:bg-primary/90 active:bg-primary/80 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 touch-manipulation"
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              </>
            ) : isCreating ? (
              // Pantalla de loading
              <div className="flex-1 flex flex-col items-center justify-center min-h-[400px] sm:min-h-[450px] md:min-h-[500px] py-8 sm:py-12">
                <div className="relative mb-6 sm:mb-8 flex items-center justify-center" style={{ width: '120px', height: '120px' }}>
                  {/* Círculo central pulsante */}
                  <div className="rounded-full bg-primary animate-pulse" style={{ width: '48px', height: '48px', backgroundColor: '#A020F0', animationDuration: '1s' }}></div>
                </div>
                <h3 className="text-white text-20 sm:text-24 md:text-28 lg:text-32 font-semibold mb-2 sm:mb-3">
                  Creating your meeting...
                </h3>
                <p className="text-muted text-opacity-70 text-14 sm:text-16 md:text-18 text-center max-w-md">
                  We're setting up your calendar event and sending invitations
                </p>
              </div>
            ) : isSuccess ? (
              // Pantalla de éxito
              <div className="flex-1 flex flex-col items-center justify-center min-h-[400px] sm:min-h-[450px] md:min-h-[500px] py-8 sm:py-12">
                <div className="relative mb-6 sm:mb-8">
                  <div className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 rounded-full bg-primary/20 flex items-center justify-center animate-pulse">
                    <Icon 
                      icon="mdi:check-circle" 
                      className="text-primary text-6xl sm:text-7xl md:text-8xl"
                    />
                  </div>
                  <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping"></div>
                  <div className="absolute inset-0 rounded-full bg-primary/10 animate-ping" style={{ animationDelay: '0.5s' }}></div>
                  <div className="absolute inset-0 rounded-full bg-primary/5 animate-ping" style={{ animationDelay: '1s' }}></div>
                </div>
                <h3 className="text-white text-20 sm:text-24 md:text-28 lg:text-32 font-semibold mb-2 sm:mb-3 text-center">
                  Meeting created successfully!
                </h3>
                <p className="text-muted text-opacity-70 text-14 sm:text-16 md:text-18 text-center max-w-md">
                  A calendar invitation has been sent to <span className="text-primary font-semibold">{userEmail}</span>
                </p>
              </div>
            ) : !selectedDay ? (
              // Vista de selección de día
              <>

                <div className="overflow-y-auto flex-1 min-h-0 pr-1 sm:pr-2 -mr-1 sm:-mr-2 custom-scrollbar overflow-x-visible">
                  {isLoadingAvailability ? (
                    // Estado de carga sutil (siempre 42 días = 6 semanas para tamaño fijo)
                    <div className="grid grid-cols-7 gap-1 sm:gap-2 pb-2 sm:pb-3 px-1 sm:px-2">
                      {[...Array(42)].map((_, index) => (
                        <div
                          key={index}
                          className="aspect-square bg-dark_grey border-2 border-section border-opacity-30 rounded-lg sm:rounded-xl p-2 sm:p-3 flex flex-col justify-center animate-pulse"
                        >
                          <div className="h-3 sm:h-4 bg-section bg-opacity-20 rounded mb-1 w-2/3 mx-auto"></div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-2 sm:space-y-3">
                      {/* Navegación del mes */}
                      <div className="flex items-center justify-between mb-3 sm:mb-4 px-1 sm:px-2">
                        <button
                          onClick={goToPreviousMonth}
                          className="p-2 rounded-lg hover:bg-section hover:bg-opacity-20 transition-colors touch-manipulation"
                          aria-label="Previous month"
                        >
                          <Icon icon="mdi:chevron-left" className="text-white text-20 sm:text-24 md:text-28" />
                        </button>
                        <h4 className="text-white text-16 sm:text-18 md:text-20 lg:text-24 font-semibold capitalize">
                          {getMonthYearLabel()}
                        </h4>
                        <button
                          onClick={goToNextMonth}
                          className="p-2 rounded-lg hover:bg-section hover:bg-opacity-20 transition-colors touch-manipulation"
                          aria-label="Next month"
                        >
                          <Icon icon="mdi:chevron-right" className="text-white text-20 sm:text-24 md:text-28" />
                        </button>
                      </div>

                      {/* Encabezados de días de la semana */}
                      <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-2 sm:mb-3">
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
                          <div
                            key={index}
                            className="text-center text-muted text-opacity-70 text-11 sm:text-13 md:text-14 font-medium py-1 sm:py-2"
                          >
                            {day}
                          </div>
                        ))}
                      </div>

                      {/* Calendario */}
                      <div className="grid grid-cols-7 gap-1 sm:gap-2">
                        {(() => {
                          const calendarDays = generateCalendarDays();
                          const today = new Date();
                          today.setHours(0, 0, 0, 0);
                          const currentYear = currentMonth.getFullYear();
                          const currentMonthIndex = currentMonth.getMonth();

                          return calendarDays.map((dayData, index) => {
                            const { date, isWeekend, isPast, availableDay } = dayData;
                            
                            // Verificar si el día pertenece al mes actual
                            const isCurrentMonth = date.getMonth() === currentMonthIndex && date.getFullYear() === currentYear;
                            
                            // Si no es del mes actual, mostrar como deshabilitado/transparente
                            if (!isCurrentMonth) {
                              return (
                                <div
                                  key={index}
                                  className="aspect-square rounded-lg sm:rounded-xl p-1 sm:p-2 flex flex-col items-center justify-center opacity-20"
                                >
                                  <span className="text-12 sm:text-14 md:text-16 font-semibold text-muted text-opacity-30">
                                    {date.getDate()}
                                  </span>
                                </div>
                              );
                            }

                            const dayNumber = date.getDate();
                            const dateOnly = new Date(date);
                            dateOnly.setHours(0, 0, 0, 0);
                            const isToday = dateOnly.getTime() === today.getTime();

                            // Crear objeto AvailableDay si no existe
                            const dayOffset = Math.ceil((date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
                            const dayForSelection: AvailableDay = availableDay || {
                              date: new Date(date),
                              label: isToday ? 'Today' : (dayOffset === 1 ? 'Tomorrow' : date.toLocaleDateString("en-US", { month: "short", day: "numeric" })),
                              dayOfWeek: date.toLocaleDateString("en-US", { weekday: "long" }),
                            };

                            // Habilitar todos los días laborables del mes actual que no sean pasados
                            const isAvailable = !isWeekend && !isPast;

                            return (
                              <button
                                key={index}
                                onClick={() => isAvailable ? handleDaySelect(dayForSelection) : undefined}
                                disabled={!isAvailable}
                                className={`aspect-square rounded-lg sm:rounded-xl p-1 sm:p-2 flex flex-col items-center justify-center transition-all duration-300 touch-manipulation group ${
                                  isWeekend || isPast
                                    ? "opacity-30 cursor-not-allowed"
                                    : isAvailable
                                    ? "bg-dark_grey border-2 border-section border-opacity-30 hover:border-primary active:border-primary hover:bg-opacity-90 hover:shadow-lg hover:shadow-primary/20 active:scale-[0.95] sm:hover:scale-[1.05] cursor-pointer"
                                    : "bg-dark_grey border-2 border-section border-opacity-10 opacity-40 cursor-not-allowed"
                                }`}
                              >
                                <span
                                  className={`text-12 sm:text-14 md:text-16 font-semibold ${
                                    isToday
                                      ? "text-primary"
                                      : isAvailable
                                      ? "text-white group-hover:text-primary transition-colors"
                                      : "text-muted text-opacity-50"
                                  }`}
                                >
                                  {dayNumber}
                                </span>
                                {isToday && (
                                  <span className="text-8 sm:text-10 text-primary mt-0.5">Today</span>
                                )}
                                {isAvailable && !isToday && (
                                  <span className="text-8 sm:text-10 text-primary mt-0.5 opacity-70">•</span>
                                )}
                              </button>
                            );
                          });
                        })()}
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              // Vista de selección de horario
              <>
                <button
                  onClick={() => setSelectedDay(null)}
                  className="flex items-center text-primary hover:text-primary/80 active:text-primary/60 mb-3 sm:mb-4 md:mb-5 lg:mb-6 transition-colors flex-shrink-0 group touch-manipulation"
                >
                  <Icon
                    icon="tabler:arrow-left"
                    className="text-18 sm:text-20 md:text-22 inline-block me-1.5 sm:me-2 group-hover:-translate-x-1 transition-transform"
                  />
                  <span className="text-13 sm:text-15 md:text-17 font-medium">Back to dates</span>
                </button>

                <div className="text-center mb-3 sm:mb-4 md:mb-6 flex-shrink-0">
                  <h3 className="text-white text-22 sm:text-26 md:text-32 lg:text-36 font-semibold mb-1 sm:mb-2">
                    Select a time
                  </h3>
                  <p className="text-muted text-opacity-70 text-12 sm:text-14 md:text-16 line-clamp-2">
                    {selectedDay.label} - {selectedDay.dayOfWeek}
                  </p>
                </div>

                <div className="overflow-y-auto flex-1 min-h-0 pr-1 sm:pr-2 -mr-1 sm:-mr-2 custom-scrollbar overflow-x-visible">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 md:gap-4 pb-2 sm:pb-3 pt-2 sm:pt-3 px-1 sm:px-2 md:px-3">
                    {timeSlots.map((timeSlot, index) => {
                      const isBooked = selectedDay ? isTimeSlotBooked(selectedDay, timeSlot) : false;
                      return (
                        <button
                          key={index}
                          onClick={() => handleTimeSlotSelect(timeSlot)}
                          disabled={isBooked || isCreating}
                          className={`text-left rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5 transition-all duration-300 min-h-[70px] sm:min-h-[75px] md:min-h-[85px] flex flex-col justify-center group touch-manipulation ${
                            isBooked || isCreating
                              ? "bg-dark_grey border-2 border-error border-opacity-40 opacity-50 cursor-not-allowed"
                              : "bg-dark_grey border-2 border-section border-opacity-30 hover:border-primary active:border-primary hover:bg-opacity-90 hover:shadow-lg hover:shadow-primary/20 active:scale-[0.98] sm:hover:scale-[1.01]"
                          }`}
                          style={{ transformOrigin: 'center' }}
                        >
                          <div className={`text-14 sm:text-16 md:text-18 font-semibold mb-0.5 sm:mb-1 flex items-center gap-1.5 sm:gap-2 flex-wrap ${
                            isBooked
                              ? "text-error"
                              : "text-white group-hover:text-primary transition-colors"
                          }`}>
                            <span className="line-clamp-1">{timeSlot.label}</span>
                            {isBooked && (
                              <span className="text-error text-10 sm:text-11 md:text-12 bg-error/20 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded whitespace-nowrap">Booked</span>
                            )}
                          </div>
                          <div className="text-muted text-opacity-70 text-11 sm:text-13 md:text-14 line-clamp-1">
                            {timeSlot.start.toString().padStart(2, "0")}:00 -{" "}
                            {timeSlot.end.toString().padStart(2, "0")}:00
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}

    </section>
  );
};

export default Platform;
