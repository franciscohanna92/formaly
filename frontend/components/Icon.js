import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy, faEye, faUser } from '@fortawesome/free-regular-svg-icons'
import { faInbox, faEnvelope, faTachometerAlt, faEdit, faRobot, faChevronRight, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

export const ICONS = {
  'COPY': faCopy,
  'INBOX': faInbox,
  'FORM': faEdit,
  'DASHBOARD': faTachometerAlt,
  'ARROW_RIGHT': faChevronRight,
  'ARROW_LEFT': null,
  'USER': faUser,
  'ACTION_VIEW': faEye,
  'EMAIL': faEnvelope,
  'RECAPTCHA': faRobot,
  'LOGOUT': faSignOutAlt
}

function Icon({ name, transform, className }) {
  return <FontAwesomeIcon transform={transform} className={className} icon={ICONS[name]} />
}

export default Icon