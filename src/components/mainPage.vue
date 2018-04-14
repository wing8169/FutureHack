<template>
  <div id="main-page">
    <div style="background-color:#e6f7ff">
      <!--Input&Search-->
      <div style="height: 100vh;background-color: #cceeff;
    display: flex;
    justify-content: center;
    align-items: center;" >
        <div  id="marginAuto">
          <p class="largefont" align="center">TIMETABLE</p>
          <div align="center">
            <p align="center" class="mediumlargefont">Please enter course code and university to search</p>
            <el-input placeholder="Input: WIA1002,UM" style="width: 300px"></el-input>
            <el-button type="primary" icon="el-icon-search">Search</el-button>
          </div>
          <div v-for="df in showing">
            <el-row>
              <p class="mediumfont" align="center">{{ df }}</p>
              <div align="center">
                <el-button v-on:click="downloadData(df)" type="primary">Download</el-button>
                <el-button type="primary" v-on:click="selectData(df)">Select this one!</el-button>
              </div>
            </el-row>
          </div>
          <div class="block" align="center" style="margin-top: 20px">
            <el-pagination class="mediumfont"
              @current-change="handleCurrentChange"
              :page-size="3"
              layout="total, prev, pager, next"
              :total="total" style="background-color: #cceeff">
            </el-pagination></div>
        </div>
      </div>

      <!--upload-->
      <p class="paddingUp"></p>
      <p class="paddingUp"></p>
      <div style="height: 100vh;background-color: #e6f7ff" class="paddingUp">
        <p align="center" class="mediumlargefont  paddingUp">If you have timetable that is not in above, feel free to upload!</p>
        <div align="center" class="paddingDown">
          <input
            @change="onFileChange"  accept=".json" type="file" name="file" id="file" class="inputfile" align="center" style="display: none;">
          <label for="file">Choose a file</label>
        </div>
        <div align="center">
          <el-button type="primary" align="center" v-on:click="goGenerator">Or..How about making a new one?</el-button>
        </div>
      </div>

      <!--import-->
      <div style="height: 100vh; background-color: #ffffff">
        <p align="center" class="mediumlargefont  paddingUp">Import your timetable here!</p>
        <div align="center">
          <el-select v-model="filter_code" id="selector1" placeholder="Course Code" class="tabButton smallfont">
            <el-option
              v-for="key in keys"
              :key="key"
              :label="key"
              :value="key"  class="smallfont" >
            </el-option>
          </el-select>
          <el-select v-model="selected_group" placeholder="Group Session"  style="width:300px">
            <el-option
              v-for="item in available"
              :key="'G' + item.group + '(' + item.types + ') ' + item.start + '-' + item.end + ' ' + item.location + ' ' + item.lecturerCode"
              :label="'G' + item.group + '(' + item.types + ') ' + item.start + '-' + item.end + ' ' + item.location + ' ' + item.lecturerCode"
              :value="item.group">
            </el-option>
          </el-select>
          <el-button type="primary" size="medium" v-on:click="chooseTime">Import</el-button>
        </div>

        <div class="mediumfont paddingUp">
          <p style="font-size: 25px" align="center">Your timetable:</p>
          <el-table :data="tableData3" style="width: 100%" align="center" height="400px" @cell-click="displayLecturerInfo">
            <el-table-column prop="time" label=" " width="150"></el-table-column>
            <el-table-column prop="MON" label="Mon" width="220"></el-table-column>
            <el-table-column prop="TUE" label="Tue" width="220"></el-table-column>
            <el-table-column prop="WED" label="Wed" width="220"></el-table-column>
            <el-table-column prop="THU" label="Thu" width="220"></el-table-column>
            <el-table-column prop="FRI" label="Fri" width="220"></el-table-column>
          </el-table>
        </div>
      </div >


      <!--export-->
      <div style="height:100vh; background-color: #e6f7ff" class="paddingUp">
        <p class="mediumlargefont" align="center">Export Your Timetable</p>
        <div class="smallfont tab">
          <p class="mediumfont paddingUp">List of Timetable:</p>
          <p>1. WIA1002 G1 Dr Su Moon Ting 11:00a.m.-01:00p.m. Tuesday</p>
          <p>2. WIA1003 G1 Dr Emran bin Tamil 09:00a.m.-11:00a.m. Tuesday</p>
          <p>3. WIA1004 G1 Dr Erma 02:00p.m.-04:00p.m. Tuesday</p>
          <p>4. WIA1005 G1 Dr Ang Tang Foong 09:00a.m.-11:00a.m. Monday</p>
          <p>5. GIG1003 G8 Dr Ponmalar 02:00p.m.-04:00p.m. Wednesday</p>
          <p>6. GIG1004 G40 Dr Aimi 03:00p.m.-04:00p.m. Thursday</p>
          <p>7. GIG1005 G5 Dr Aznul bin Abdrul Qalid 04:00p.m.-06:00p.m. Monday</p>
        </div>
        <div class="mediumfont paddingUp" align="center">
          <p>Your Timetable Is Ready To Go!</p>
          <el-button type="primary" size="medium">Download</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
      name: "main-page",
      data(){
        return{
          tableData3: [{
            time:'0800-0900', MON: '', TUE: '', WED: '', THU: '', FRI: '',
          }, {
            time:'0900-1000', MON: '', TUE: '', WED: '', THU: '', FRI: '',
          },{
            time:'1000-1100', MON: '', TUE: '', WED: '', THU: '', FRI: '',
          }, {
            time:'1100-1200', MON: '', TUE: '', WED: '', THU: '', FRI: '',
          }, {
            time:'1200-1300', MON: '', TUE: '', WED: '', THU: '', FRI: '',
          },{
            time:'1300-1400', MON: '', TUE: '', WED: '', THU: '', FRI: '',
          },{
            time:'1400-1500', MON: '', TUE: '', WED: '', THU: '', FRI: '',
          },{
            time:'1500-1600', MON: '', TUE: '', WED: '', THU: '', FRI: '',
          },{
            time:'1600-1700', MON: '', TUE: '', WED: '', THU: '', FRI: '',
          },{
            time:'1700-1800', MON: '', TUE: '', WED: '', THU: '', FRI: '',
          },{
            time:'1800-1900', MON: '', TUE: '', WED: '', THU: '', FRI: '',
          },{
            time:'1900-2000', MON: '', TUE: '', WED: '', THU: '', FRI: '',
          },{
            time:'2000-2100', MON: '', TUE: '', WED: '', THU: '', FRI: '',
          },{
            time:'2100-2200', MON: '', TUE: '', WED: '', THU: '', FRI: '',
          }],
          temp: [],
          file: "",
          file2: "",
          database_files: [],
          lecturers: {},
          subjects: {},
          filter_code: "",
          selected_group: "",
          keys: [],
          chosen_groups: {},
          occupied_time: {
            MON: [],
            TUE: [],
            WED: [],
            THU: [],
            FRI: []
          },
          taken: [],
          tempArr: [],
          showing: []
        }
      },
      computed:{
        total: function(){
          return this.database_files.length;
        },
        available: function(){
          // filter_code = WIA1001 // first filter
          // subjects = {"WIA1001":[{detaillsss}]}    // 还没有选的
          // chosen_groups = {"WIA1001":[{details}]}    // 选了的
          // if subjects[filter_code][types] 有在 chosen_groups，don't want it
          if(this.filter_code === "Please Select") {
            this.selected_group = "Please Select";
            return;
          }
          if (! this.chosen_groups[this.filter_code]){
            return this.subjects[this.filter_code];
          }
          this.taken = [];
          for(var i=0; i<this.chosen_groups[this.filter_code].length; i++){
            this.taken.push(this.chosen_groups[this.filter_code][i]["types"]);
          }
          this.temp = [];
          for(var j=0; j<this.subjects[this.filter_code].length; j++){
            let item = this.subjects[this.filter_code][j];
            if(this.taken.indexOf(item.types) === -1){
              let day = item.start.substring(0, 3);
              // easiest rounding algorithm
              let timeStart = item.start.substring(3, item.start.indexOf("."));
              let timeEnd = item.end.substring(3, item.end.indexOf("."));
              if(this.occupied_time[day].indexOf(timeStart) === -1 && this.occupied_time[day].indexOf(timeEnd) === -1){
                this.temp.push(item);
              }
            }
          }
          return this.temp;
        }
      },
      mounted(){
        this.$firebase_basic.database().ref("database_files").on("value", (data)=>{
          this.database_files = data.val();
        });
        this.total = this.database_files.length;
        this.$ls.get("lecturers", {});
        this.$ls.get("subjects", {});
        this.showing = this.database_files.slice(0, 3);
      },
      methods:{
        displayLecturerInfo: function(){

        },
        handleCurrentChange(val) {
          this.showing = this.database_files.slice(val*3-3, val*3);
        },
        chooseTime: function(){
          if(this.filter_code === "" || this.filter_code === "Please Select" || this.selected_group === "" || this.selected_group === "Please Select") return;
          if(!this.chosen_groups[this.filter_code]) this.chosen_groups[this.filter_code] = [];
          let temp = {};
          for(var i=0; i<this.subjects[this.filter_code].length; i++){
            if(this.subjects[this.filter_code][i].group === this.selected_group){
              temp = this.subjects[this.filter_code][i];
              break;
            }
          }
          this.chosen_groups[this.filter_code].push(temp);
          // easiest rounding algorithm
          let timeStart = temp.start.substring(3, temp.start.indexOf("."));
          let timeEnd = temp.end.substring(3, temp.end.indexOf("."));
          this.occupied_time[temp.start.substring(0, 3)].push(timeStart);
          this.occupied_time[temp.start.substring(0, 3)].push(timeEnd);
          this.filter_code = "Please Select";
          this.selected_group  = "Please Select";

        },
        // importData: function(){
        //   if(this.file2.name){
        //     let self = this;
        //     const f = new FileReader();
        //     f.readAsText(this.file2);
        //     f.onload = function(event) {
        //       // The file's text will be printed here
        //       let x = JSON.parse(event.target.result);
        //       if(x[0].cv){
        //         for(var i=0; i<x.length; i++){
        //           self.lecturers[x[i].code] = {
        //             name: x[i].name,
        //             cv: x[i].cv
        //           };
        //         }
        //       }
        //       else{
        //         var index = self.file2.name.indexOf("_");
        //         var courseCode  = self.file2.name.substring(index + 1, index + 1 + self.file2.name.substring(index+1).indexOf("_"));
        //         self.subjects[courseCode] = [];
        //         for(var i=0; i<x.length; i++){
        //           self.subjects[courseCode].push({
        //             group: x[i].group,
        //             lecturerCode: x[i].lecturerCode,
        //             location: x[i].location,
        //             start: x[i].start,
        //             end: x[i].end,
        //             types: x[i].types
        //           });
        //         }
        //        if(self.keys.indexOf(courseCode) == -1) self.keys.push(courseCode);
        //       }
        //     };
        //   }
        // },
        removeData: function(){

        },
        downloadData: function(df){
          let storage = this.$firebase_basic.storage().ref("download_list/" + df);
          storage.getDownloadURL().then(function(url){
            window.open(url, '_self');
          }).catch(function(error){});
        },
        selectData: function(df){
          let self = this;
          let storage = this.$firebase_basic.storage().ref("download_list/" + df);
          storage.getDownloadURL().then(function(url){
            var xhr = new XMLHttpRequest();
            xhr.responseType = 'blob';
            xhr.onload = function(event) {
              var blob = xhr.response;
              const f = new FileReader();
              f.readAsText(blob);
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
                  var index = df.indexOf("_");
                  var courseCode  = df.substring(index + 1, index + 1 + df.substring(index+1).indexOf("_"));
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
                  if(self.keys.indexOf(courseCode) === -1) self.keys.push(courseCode);
                }
              };
            };
            xhr.open('GET', url);
            xhr.send();
          }).catch(function(error){});
        },
        downloadDataToStorage: function(df){

        },
        // invoked when file selector changes value
        onFileChange(e) {
          let files = e.target.files || e.dataTransfer.files;
          if (!files.length)
            return;
          this.file = files[0];
          this.uploadData();
        },
        // invoked when file selector changes value
        // onFileChange2(e) {
        //   let files = e.target.files || e.dataTransfer.files;
        //   if (!files.length)
        //     return;
        //   this.file2 = files[0];
        // },
        goGenerator: function(){
          this.$router.push({path: "/generator"});
        },
        uploadData: function(){
          if(this.file.name){
            let ref = this.$firebase_basic.storage().ref().child("download_list/" + this.file.name);
            ref.put(this.file).then(()=>{
              this.$firebase_basic.database().ref("database_files").once("value").then((data)=>{
                this.temp = data.val();
                if(!this.temp) this.temp = [];
                this.temp.push(this.file.name);
                this.database_files = this.temp;
              }).then(()=>{
                this.$firebase_basic.database().ref("database_files").set(this.temp);
                });
              });
            }
        }
      }
    }
</script>

<style>
  @font-face{
    font-family: "RTWS YueRoundedGothic Demo";
    src: url("../fonts/font01.otf");
  }
  .largefont{
    font-family:"RTWS YueRoundedGothic Demo","Letter Gothic Std","Orator Std","HelvLight", "Consolas","Letter Gothic Std",sans-serif;
    font-size: 70px;
    margin:0;
  }
  .mediumfont{
    font-family:"RTWS YueRoundedGothic Demo","Letter Gothic Std","Orator Std", "HelvLight","Consolas",sans-serif;
    font-size: 20px;
  }
  .mediumlargefont{
    font-family:"RTWS YueRoundedGothic Demo","Letter Gothic Std","Orator Std", "HelvLight","Consolas",sans-serif;
    font-size: 35px;
  }
  .smallfont{
    font-family:"RTWS YueRoundedGothic Demo","HelvLight","Consolas","Letter Gothic Std",sans-serif;
    font-size: 17px;
  }
  .paddingUp{
    padding-top: 30px;
  }
  .paddingDown{
    padding-bottom: 30px;
  }
  /*el-input{*/
  /*column-span: 12;*/
  /*row-span: 12;*/
  /*}*/
  .tabButton{
    padding-left: 20px;
  }
  .inputfile + label {
    font-size: 15px;
    font-family:sans-serif;
    padding-top: 10px;
    text-align: center;
    width:100px;
    height: 30px;
    border-radius: 4px;
    color: white;
    background-color:dodgerblue;
    display: inline-block;
  }
  .tab{
    padding-left: 450px;
  }
  el-table{
    background-color: #cceeff;
  }
  .el-pager li{
    background:transparent !important;
  }
  .el-pagination .btn-next, .el-pagination .btn-prev{
    background-color: transparent;
  }
  .el-pagination button.disabled{
    background-color: transparent;
  }
  body{
    margin:0;
  }
  #marginAuto{
  ;
  }
</style>
