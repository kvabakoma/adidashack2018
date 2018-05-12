/**
 * Created by Kvaba on 7/14/2017.
 */
module.exports = (payload)=>{
  let errors = {}
  let isFormValid = true
  let message = ''

  if (!payload || typeof payload.username !== 'string' ||  payload.username.trim().length < 3) {
    isFormValid = false
    errors.username = 'Username must be at least 3 symbols'
  }

  if (!payload || typeof payload.password !== 'string' || payload.password.trim().length < 6) {
    isFormValid = false
    errors.password = 'Password must be at least 6 symbols'
  }

  if (!isFormValid) {
    message = 'Check the form for errors.'
  }

  return {
    success: isFormValid,
    message:message,
    errors:errors
  }

}
