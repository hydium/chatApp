import firebase from 'firebase'; 

class Fire {
	constructor() {
		this.init();
		this.state = {
			path: 'messages',
		} 
	}

	// observeAuth = () =>
 //    firebase.auth().onAuthStateChanged(this.onAuthStateChanged);

 //  onAuthStateChanged = user => {
 //    if (!user) {
 //      try {
 //        firebase.auth().signInAnonymously();
 //      } catch ({ message }) {
 //        alert(message);
 //      }
 //    }
 //  };

	get ref() {
	  return firebase.database().ref(this.state.path);
	}


	on = callback =>
    this.ref
      .limitToLast(20)
      .on('child_added', snapshot => 
  callback(this.parse(snapshot)));

  parse = snapshot => {
  	const { timestamp: numberStamp, text, user } = snapshot.val();
	  const { key: _id } = snapshot;
	  const timestamp = new Date(numberStamp);
	  const message = {
	    _id,
	    timestamp,
	    text,
	    user,
	  };
	 return message;
	}

	off() {
  	this.ref.off();
	}

	get uid() {
  	return (firebase.auth().currentUser || {}).uid;
	}

	get timestamp() {
	  return firebase.database.ServerValue.TIMESTAMP;
	}

	send = messages => {
	  for (let i = 0; i < messages.length; i++) {
	    const { text, user } = messages[i];
	    const message = {
	      text,
	      user,
	      timestamp: this.timestamp,
	    };
	    this.append(message);
	  };
	};

	append = message => this.ref.push(message);

	init = () =>
		firebase.initializeApp({
			apiKey: "AIzaSyCCwz_TEaj6iYNw1hHXAzdtP8mA1GPVNrA",
	    authDomain: "chatapp-90839.firebaseapp.com",
	    databaseURL: "https://chatapp-90839.firebaseio.com",
	    projectId: "chatapp-90839",
	    storageBucket: "",
	    messagingSenderId: "1016411262425"
	  });
}



Fire.shared = new Fire();


export default Fire;
