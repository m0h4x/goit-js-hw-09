import flatpickr from "flatpickr"
import "flatpickr/dist/flatpickr.min.css"
import Notiflix from 'notiflix'



const button = document.querySelector('[data-start]')
const valueDays = document.querySelector('[data-days]')
const valueHours = document.querySelector('[data-hours]')
const valueMinutes = document.querySelector('[data-minutes]')
const valueSeconds = document.querySelector('[data-seconds]')

let timerId = null
let date = new Date()
 
    
button.setAttribute('disabled', true)



flatpickr("#datetime-picker",{
  enableTime: true,
  time_24hr: true,
  defaultDate: date,
  minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] < date) {      
    Notiflix.Notify.warning('Please choose a date in the future')
        }
        let timeLeft = selectedDates[0].getTime()
      
 
        if (selectedDates[0] > date) {
            button.removeAttribute('disabled', true)
            function onBtnClick() {
             timerId = setInterval(() => {
                       const { days, hours, minutes, seconds } =   convertMs(timeLeft - Date.now()) 
                        valueDays.textContent = days
                        valueHours.textContent = hours
                        valueMinutes.textContent = minutes
                        valueSeconds.textContent = seconds
                 if (Number(valueDays.textContent) === 0 && Number(valueHours.textContent) === 0 && Number(valueMinutes.textContent) === 0 && Number(valueSeconds.textContent) === 0) {
                        clearInterval(timerId)
                                     }
                        
                    }, 1000) 
                }
        
 button.addEventListener('click', onBtnClick)
  }
 
      },
})


function addLeadingZero(value) {
    return String(value).padStart(2,'0')
}
 
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}