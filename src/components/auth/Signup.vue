<template>
  <div class="signup container">
    <form @submit.prevent="signup" class="card-panel">
      <h2 class="center deep-purple-text">Signup</h2>
      <div class="field">
        <label for="email">Email:</label>
        <input type="email" name="email" v-model="email" />
      </div>
      <div class="field">
        <label for="password">Password:</label>
        <input type="password" name="password" v-model="password" />
      </div>
      <div class="field">
        <label for="alias">Alias:</label>
        <input type="text" name="alias" v-model="alias" />
      </div>
      <p class="red-text center" v-if="feedback">{{ this.feedback }}</p>
      <div class="field center">
        <button class="btn deep-purple">Signup</button>
      </div>
    </form>
  </div>
</template>

<script>
import slugify from 'slugify';
import db from '@/firebase/init';
// import firebase from 'firebase';
// import functions from 'firebase/functions';
import { auth, functions } from 'firebase';

export default {
  name: 'Signup',
  data() {
    return {
      email: null,
      password: null,
      alias: null,
      feedback: null,
      slug: null,
    };
  },
  methods: {
    signup() {
      if (this.email && this.password && this.alias) {
        this.slug = slugify(this.alias, {
          replacement: '-',
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true,
        });

        let checkAlias = functions().httpsCallable('checkAlias');
        checkAlias({ slug: this.slug }).then(result => {
          if (!result.data.unique) {
            this.feedback = 'This alias already exists';
          } else {
            auth()
              .createUserWithEmailAndPassword(this.email, this.password)
              .then(({ user }) => {
                db.collection('users')
                  .doc(this.slug)
                  .set({
                    alias: this.alias,
                    geolocation: null,
                    user_id: user.uid,
                  });
              })
              .then(() => this.$router.push({ name: 'Home' }))
              .catch(err => {
                console.log('err :>> ', err);
                this.feedback = err.message;
              });
            // this.feedback = "This alias is free to use";
          }
        });
      } else {
        this.feedback = 'You must enter all fields';
      }
    },
  },
};
</script>

<style>
.signup {
  max-width: 400px;
  margin-top: 60px;
}
.signup h2 {
  font-size: 2.4em;
}
.signup .field {
  margin-bottom: 16px;
}
</style>
