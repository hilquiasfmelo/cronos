import { useState } from 'react'
import { CalendarScheduling } from './calendar-scheduling'
import { ConfirmSchedulingAdv } from './confirm-scheduling-adv'

export default function ScheduleForm() {
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>()

  function handleClearSelectedDateTime() {
    setSelectedDateTime(null)
  }

  if (selectedDateTime) {
    return (
      <ConfirmSchedulingAdv
        schedulingDate={selectedDateTime}
        onCancelOrBackConfirmation={handleClearSelectedDateTime}
      />
    )
  }

  return <CalendarScheduling onSelectDateTime={setSelectedDateTime} />
}
