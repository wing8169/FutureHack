<template>
  <div id="main-page">
    <el-container>
      <el-header>
        Better Timetable
      </el-header>
      <el-main>
        <input type="text" placeholder="Search">
        <div v-for="df in database_files">
          <p >{{ df }}</p>
          <button type="button" v-on:click="downloadData(df)">download</button>
        </div>
        <input type="file" accept=".json" v-on:change="onFileChange" style="margin-top: 30px">
        <button type="button" v-on:click="uploadData">Upload data</button>
        <input type="file" accept=".json" v-on:change="onFileChange2" style="margin-top: 30px">
        <button type="button" v-on:click="importData">Import data</button>
      </el-main>
      <el-footer>

      </el-footer>
    </el-container>
  </div>
</template>

<script>
    export default {
      name: "main-page",
      data(){
        return{
          temp: [],
          file: "",
          file2: "",
          database_files: [],
          lecturer_info: [],
          subject_info: [],
          lecturers: {},
          subjects: {}
        }
      },
      mounted(){
        this.$firebase_basic.database().ref("database_files").on("value", (data)=>{
          this.database_files = data.val();
        });
      },
      methods:{
        importData: function(){
          if(this.file2.name){
            let self = this;
            const f = new FileReader();
            f.readAsText(this.file2);
            f.onload = function(event) {
              // The file's text will be printed here
              let x = JSON.parse(event.target.result);
              if(x[0].cv){
                for(var i=0; i<x.length; i++){
                  self.lecturers[x[i].code] = {
                    name: x[i].name,
                    cv: x[i].cv
                  };
                }
              }
              else{
                var index = self.file2.name.indexOf("_");
                var courseCode  = self.file2.name.substring(index + 1, index + 1 + self.file2.name.substring(index+1).indexOf("_"));
                self.subjects[courseCode] = [];
                for(var i=0; i<x.length; i++){
                  self.subjects[courseCode].push({
                    group: x[i].group,
                    lecturerCode: x[i].lecturerCode,
                    location: x[i].location,
                    start: x[i].start,
                    end: x[i].end,
                    types: x[i].types
                  });
                }
              }
            };
          }
        },
        downloadData: function(df){
          let storage = this.$firebase_basic.storage().ref("download_list/" + df);
          storage.getDownloadURL().then(function(url){
            window.open(url, '_self');
          }).catch(function(error){});
        },
        // invoked when file selector changes value
        onFileChange(e) {
          let files = e.target.files || e.dataTransfer.files;
          if (!files.length)
            return;
          this.file = files[0];
        },
        // invoked when file selector changes value
        onFileChange2(e) {
          let files = e.target.files || e.dataTransfer.files;
          if (!files.length)
            return;
          this.file2 = files[0];
        },
        uploadData: function(){
          if(this.file.name){
            let ref = this.$firebase_basic.storage().ref().child("download_list/" + this.file.name);
            ref.put(this.file).then(()=>{
              this.$firebase_basic.database().ref("database_files").once("value").then((data)=>{
                this.temp = data.val();
                if(!this.temp) this.temp = [];
                this.temp.push(this.file.name);
              }).then(()=>{
                this.$firebase_basic.database().ref("database_files").set(this.temp);
                });
              });
            }
        }
      }
    }
</script>

<style scoped>

</style>
