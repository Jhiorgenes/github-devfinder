const repos = document.getElementById('repos')
const input = document.getElementById('input')
const button = document.getElementById('button')
const userUrl = document.getElementById('user-url')
const userBio = document.getElementById('user-bio')
const joinDate = document.getElementById('join-date')
const userName = document.getElementById('user-name')
const following = document.getElementById('following')
const followers = document.getElementById('followers')
const userLogin = document.getElementById('user-login')
const userPhoto = document.getElementById('user-photo')
const userTwitter = document.getElementById('user-twitter')
const userLocation = document.getElementById('user-location')

// icones para efetuar a mudança de cor de acordo com o tema
const linkIcon = document.getElementById('link-icon')
const locationIcon = document.getElementById('location-icon')
const twitterIcon = document.getElementById('twitter-icon')
const changeThemeIcon = document.getElementById('change-theme')

async function handleSubmit() {
  const user = input.value
  try {
    if (user) {
      // * caso foi digitado algo no input
      const response = await fetch(`https://api.github.com/users/${user}`)
      if (response.status === 404) {
        showErrorRequisitionAlert()
      }
      const json = await response.json()
      console.log(json)
      updateHtml(json)
      input.value = ''
    } else {
      showErrorInputEmptyAlert()
    }
  } catch (err) {
    console.log(err)
  } finally {
  }
}

function updateHtml(json) {
  userPhoto.src = json.avatar_url
  userName.innerHTML = json.name
  userLogin.innerHTML = json.login
  joinDate.innerHTML = new Date(json.created_at).toLocaleDateString()
  userBio.innerHTML = json.bio ?? 'This profile has no bio'
  repos.innerHTML = json.public_repos
  followers.innerHTML = json.followers
  following.innerHTML = json.following
  userLocation.innerHTML = json.location ?? 'Undefined'
  userUrl.innerHTML = `<a href="${json.html_url}" target="_blank">${json.login}</a>`
  userTwitter.innerHTML = json.twitter_username ?? 'Undefined Twitter'
}

function showErrorRequisitionAlert() {
  iziToast.warning({
    title: 'Opa!',
    titleColor: 'black',
    titleSize: '18',
    message: 'Nenhum usuário com esse nome encontrado!',
    messageSize: '14',
    messageColor: 'white',
    backgroundColor: 'red',
    theme: 'light',
    position: 'topLeft',
    timeout: 5000,
    animateInside: true,
    drag: true,
    pauseOnHover: true,
    resetOnHover: false,
    progressBar: true,
    progressBarColor: 'white',
    progressBarEasing: 'linear',
    transitionIn: 'fadeInRight',
    transitionOut: 'fadeOutLeft',
    transitionInMobile: 'fadeInRight',
    transitionOutMobile: 'fadeOutLeft',
  })
  updateHtml()
}

function showErrorInputEmptyAlert() {
  iziToast.warning({
    title: 'Opa!',
    titleColor: 'black',
    titleSize: '18',
    message: 'Digite um nome de usuário ai meu patrão!',
    messageSize: '14',
    messageColor: 'white',
    theme: 'light',
    position: 'topLeft',
    timeout: 5000,
    backgroundColor: 'red',
    animateInside: true,
    drag: true,
    pauseOnHover: true,
    resetOnHover: false,
    progressBar: true,
    progressBarColor: 'white',
    progressBarEasing: 'linear',
    transitionIn: 'fadeInRight',
    transitionOut: 'fadeOutLeft',
    transitionInMobile: 'fadeInRight',
    transitionOutMobile: 'fadeOutLeft',
  })
}

function handleChangeTheme() {
  const body = document.querySelector('body')
  body.classList.toggle('light')
  if (body.classList.contains('light')) {
    linkIcon.src = './assets/images/link-dark.svg'
    changeThemeIcon.src = './assets/images/moon.svg'
    twitterIcon.src = './assets/images/twitter-dark.svg'
    locationIcon.src = './assets/images/location-dark.svg'
  } else {
    linkIcon.src = './assets/images/link-light.svg'
    changeThemeIcon.src = './assets/images/sun.svg'
    locationIcon.src = './assets/images/location-light.svg'
    twitterIcon.src = './assets/images/twitter-light.svg'
  }
}

handleSubmit()
button.addEventListener('click', handleSubmit)
input.addEventListener('keyup', e => {
  if (e.key === 'Enter') {
    handleSubmit()
  }
})
changeThemeIcon.addEventListener('click', handleChangeTheme)
