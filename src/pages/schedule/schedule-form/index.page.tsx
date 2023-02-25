import { useState } from 'react'
import { CalendarScheduling } from './calendar-scheduling'
import { ConfirmSchedulingAdv } from './confirm-scheduling-adv'

export default function ScheduleForm() {
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>()

  function handleClearSelectedDateTime() {
    if (window.confirm('Tem certeza que deseja cancelar o agendamento?')) {
      setSelectedDateTime(null)
    }
  }

  function handletoBackCalendarScheduling() {
    setSelectedDateTime(null)
  }

  if (selectedDateTime) {
    return (
      <ConfirmSchedulingAdv
        schedulingDate={selectedDateTime}
        onCancelConfirmation={handleClearSelectedDateTime}
        toBackCalendarScheduling={handletoBackCalendarScheduling}
      />
    )
  }

  return <CalendarScheduling onSelectDateTime={setSelectedDateTime} />
}
