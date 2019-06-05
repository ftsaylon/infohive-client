export function getItem(key){
	return new Promise((resolve, reject) => {
		window.FB.getLoginStatus(function(response){
			  if(response.status === 'connected' && (sessionStorage.getItem('fb_userid') === response.authResponse.userID)){
        	  	resolve(response)
			  }
			  else{
			  	reject('FB INCONSISTENCY')
			  }
 		})
	})
	.catch(err => {
		console.log(err)
	})
}

export function getUserTag(){
	return localStorage.getItem('user_tag')
}

export function getProfile(){
	var profile = {};
	profile.picture = localStorage.getItem('picture')
	profile.name = localStorage.getItem('name')
	profile.mode = localStorage.getItem('mode')
	profile.id = sessionStorage.getItem('fb_userid');
	return profile
}

export function setProfile(name, picture, mode, id, user_tag){
	localStorage.setItem('name', name)
	localStorage.setItem('picture', picture)
	localStorage.setItem('mode', mode)
	localStorage.setItem('id', id)
	localStorage.setItem('user_tag', user_tag)
}

export function logout(){
	localStorage.clear()
}