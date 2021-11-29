import Notiflix from 'notiflix'

const form = document.querySelector('.form')
const inputDelay = document.querySelector('[name = delay]')
const step = document.querySelector('[name = step]')
const amount = document.querySelector('[name = amount]')


 form.addEventListener('submit', onFormSubmit)

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
  
  const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
 
  if (shouldResolve) {
resolve({position, delay})
  } else {
  reject({position, delay})
  }
                
        }, delay)
  })
}