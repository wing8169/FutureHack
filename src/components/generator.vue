<template>
  <div>
    <keep-alive>
      <div id="generator">
        <el-button v-on:click="back" style="margin: 30px" type="primary">Back To Main Page</el-button>
        <el-table :data="subject_info" border  style="width: 100%" align="center" height="400px">
            <el-table-column type="index" width="50">
            </el-table-column>
            <el-table-column prop="group" label="Group" width="80">
            </el-table-column>
            <el-table-column prop="lecturerCode" label="Lecturer Code" width="120">
            </el-table-column>
            <el-table-column prop="start" label="Start Time" width="120">
            </el-table-column>
            <el-table-column prop="end" label="End Time" width="120">
            </el-table-column>
            <el-table-column prop="location" label="Location" width="120">
            </el-table-column>
            <el-table-column prop="types" label="Types (K/T/L)" width="120">
            </el-table-column>
            <el-table-column label="Operations" width="120">
              <template slot-scope="scope">
                <el-button v-on:click.native.prevent="deleteRow(scope.$index)" type="text">Remove</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-row style="margin-top: 20px">
            <el-form>
              <el-form-item  ref="form" :model="form" label-width="0px" style="display: flex;
    justify-content: flex-end;">
                <el-button type="danger" v-on:click="clearTable">Clear All</el-button>
                <label style="margin-left: 30px">Upload database: </label>
                <input type="file" accept=".json, .txt" id="file2" class="inputfile" style="display: none" v-on:change="onFileChange">
                <label for="file2">Choose File</label>
              </el-form-item>
            </el-form>
          </el-row>
      </div>
    </keep-alive>
    <hr> <!--Input form===========================================-->
    <h1 class="tab-button">Insert Group Information:</h1>
    <div class="tab-button">
      <div id="app">
        <el-form ref="form" :model="form" label-width="120px">
          <el-form-item label="Group : ">
            <el-input v-model.number="form.group" type="number" style="width: 220px"></el-input>
          </el-form-item>
          <el-form-item label="Lecturer Code : ">
            <el-input v-model.trim="form.lecturerCode" style="width: 220px"></el-input>
          </el-form-item>
          <el-form-item label="Start Time : ">
            <el-time-select v-model="form.start" :picker-options="{
                start: '08:00',
                step: '01:00',
                end: '22:00'
              }" placeholder="Select time">
            </el-time-select>
          </el-form-item>
          <el-form-item label="End Time : ">
            <el-time-select v-model="form.end" :picker-options="{
                start: '08:00',
                step: '01:00',
                end: '22:00'
              }" placeholder="Select time">
            </el-time-select>
          </el-form-item>
          <el-form-item label="Location : ">
            <el-input v-model.trim="form.location" style="width: 220px"></el-input>
          </el-form-item>
          <el-form-item label="Types : ">
            <el-input v-model.trim="form.types" style="width: 220px"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" v-on:click="addTo">Add</el-button>
          </el-form-item>
          <el-form-item label="Filename : ">
            <el-input v-model="filename" style="width: 220px" placeholder="e.g.: UM_WIA1002_2018sem2"></el-input>
            <el-button type="success" v-on:click="save">Save database file locally</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>

    export default {

        name: "generator",
        data(){
          return{
            filename: JSON.parse(this.$ls.get("file")) || "",
            file:"",
            // lecturer_info:[{
            //   code: "SMT",
            //   name: "Dr Su Moon Ting",
            //   cv: "drSu@siswa.um.edu"
            //   }
            // ],
            subject_info: JSON.parse(this.$ls.get("table")) || [
          ],
          form:{
            group: "",
            lecturerCode: "",
            location: "",
            start: "",
            end: "",
            types: ""
          },
          nowEdit: false,
          nowIndex: 0
        }
      },
      mounted(){
        // this.subject_info = this.$ls.get("subject_info", []);
      },
      methods:{
          back: function(){
            this.$router.push({path: "/"});
          },
          addTo:function(){
            this.subject_info.push(this.form);
            this.$ls.set("table", JSON.stringify(this.subject_info));
        },
        // clear:function(){
        //   this.form.no = "";
        //   this.form.group = "";
        //   this.form.lecturerCode = "";
        //   this.form.location = "";
        //   this.form.start = "";
        //   this.form.end = "";
        //   this.form.types = "";
        // },
        save:function download() {
            var element = document.createElement('a');
            element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(this.subject_info)));
            element.setAttribute('download', this.filename);
            element.style.display = 'none';
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
        },
        deleteRow:function(index) {
          this.subject_info.splice(index, 1);
          this.$ls.set("table", JSON.stringify(this.subject_info));
        },
        clearTable: function(){
          this.subject_info = [];
          this.$ls.set("table", JSON.stringify(this.subject_info));
        },
        importData: function(){
          this.$ls.set("file", JSON.stringify(this.file.name));
          if(this.file.name){
            let self = this;
            const f = new FileReader();
            f.readAsText(this.file);
            f.onload = function(event) {
              // The file's text will be printed here
              let x = JSON.parse(event.target.result);
              self.subject_info = x;
              self.$ls.set("table", event.target.result);
            };
          }
        },
        // invoked when file selector changes value
        onFileChange(e) {
          let files = e.target.files || e.dataTransfer.files;
          if (!files.length)
            return;
          this.file = files[0];
          this.importData();
        },


      }
    }
</script>

<style scoped>

  .inputfile + label {
    font-size: 15px;
    font-family:sans-serif;
    padding-top: -30px;
    text-align: center;
    width:100px;
    height: 40px;
    border-radius: 4px;
    color: white;
    background-color:dodgerblue;
    display: inline-block;
    margin-right: 30px;
  }
  .tab-button{
    padding-left: 100px;
  }
  .tab{
    margin-left:40px ;
  }

</style>
