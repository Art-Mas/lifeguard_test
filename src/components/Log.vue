<template>
 <div>
   <div>
     <h2>Events:</h2>
   </div>
   <ul>
     <li v-for="logData in log">
       Нажата рамка <b>{{logData.frameName}}</b> в координатах x:{{logData.x}}, y: {{logData.y}}
     </li>
   </ul>
 </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'Log',

  computed: {
    ...mapState({
      /**
       * @param {LogInfo}
       */
      log: state => state.log
    })
  }
}
</script>