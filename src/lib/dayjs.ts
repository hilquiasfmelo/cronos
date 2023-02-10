import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

import 'dayjs/locale/pt-br'

dayjs.extend(utc)
dayjs.extend(timezone)

dayjs.locale('pt-br')
dayjs.tz.setDefault('America/Sao_Paulo')
