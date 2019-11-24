import React, { Component } from "react";
import PropTypes from "prop-types";
import Firebase from "../Utils/Firebase";

const defaultFirebaseContext = {
  authStatusReported: false,
  isUserSignedIn: false,
  firebase: Firebase
};

export const FirebaseContext = React.createContext(defaultFirebaseContext);

export default class FirebaseAuthProvider extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  };

  state = defaultFirebaseContext;

  componentDidMount() {
    Firebase.auth.onAuthStateChanged(user =>
      this.setState({
        authStatusReported: true,
        isUserSignedIn: !!user,
        user
      })
    );
  }

  createUserWithEmailAndPassword = async (email, password) =>
    await Firebase.auth.createUserWithEmailAndPassword(email, password);

  signInWithEmailAndPassword = async (email, password) =>
    await Firebase.auth.signInWithEmailAndPassword(email, password);

  signInWithGoogle = async () =>
    await Firebase.auth.signInWithPopup(Firebase.googleProvider);

  signOut = async () => await Firebase.auth.signOut();

  getVideosFromCategory = async (category, limit = 5) => {
    let categoryDocReference = "";
    const videos = [];

    await Firebase.firestore
      .collection("categories")
      .where("name", "==", category)
      .limit(1)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          if (doc.exists) {
            categoryDocReference = doc.ref;
          }
        });
      });

    await Firebase.firestore
      .collection("videos")
      .where("category", "==", categoryDocReference)
      .limit(limit)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const video = doc.data();
          video["created_at"] = video.created_at.toDate();
          videos.push(video);
        });
      });

    return videos;
  };

  render() {
    return (
      <FirebaseContext.Provider
        value={{
          ...this.state,
          createUserWithEmailAndPassword: this.createUserWithEmailAndPassword,
          signInWithEmailAndPassword: this.signInWithEmailAndPassword,
          signInWithGoogle: this.signInWithGoogle,
          signOut: this.signOut,
          getVideosFromCategory: this.getVideosFromCategory
        }}
      >
        {this.props.children}
      </FirebaseContext.Provider>
    );
  }
}
