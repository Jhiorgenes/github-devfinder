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
const twitterIcon = document.getElementById('twitter-icon')
const locationIcon = document.getElementById('location-icon')
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
      const data = await response.json()
      updateHtml(data)
      input.value = ''
    } else {
      showErrorInputEmptyAlert()
    }
  } catch (err) {
    console.log(err)
  }
}

function updateHtml(json) {
  userName.innerHTML = json.name
  userPhoto.src = json.avatar_url
  userLogin.innerHTML = json.login
  repos.innerHTML = json.public_repos
  followers.innerHTML = json.followers
  following.innerHTML = json.following
  userBio.innerHTML = json.bio ?? 'This profile has no bio'
  userLocation.innerHTML = json.location ?? 'Undefined'
  joinDate.innerHTML = new Date(json.created_at).toLocaleDateString()
  userUrl.innerHTML = `<a href="${json.html_url}" target="_blank">${json.login}</a>`
  userTwitter.innerHTML =
    json.twitter_username ?? "this user doesn't have twitter"
}

function showErrorRequisitionAlert() {
  iziToast.warning({
    title: 'Oops!',
    titleColor: 'black',
    titleSize: '18',
    message: 'User not found!',
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
    title: 'Oops',
    titleColor: 'black',
    titleSize: '18',
    message: 'Insert a name in the search input!',
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
    localStorage.setItem('theme', 'light')
    linkIcon.src = './assets/images/link-dark.svg'
    changeThemeIcon.src = './assets/images/moon.svg'
    twitterIcon.src = './assets/images/twitter-dark.svg'
    locationIcon.src = './assets/images/location-dark.svg'
  } else {
    body.classList.toggle('dark')
    localStorage.setItem('theme', 'dark')
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

window.addEventListener('load', function (event) {
  const body = this.document.querySelector('body')

  const storedTheme = this.localStorage.getItem('theme')
  if (storedTheme === 'light') {
    body.classList.add(storedTheme)
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
})
