<template>
  <div>
    <keep-alive>
    <div id="generator">
      <template>
        <el-table :data="subject_info" border height="350" style="width: 100%">
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
        <el-table-column fixed="right" label="Operations" width="120">
          <template slot-scope="scope">
            <el-button v-on:click.native.prevent="deleteRow(scope.$index, subject_info)" type="text" size="small">
              Remove
            </el-button>
            <el-button v-on:click.native.prevent="edit(scope.$index, subject_info)" type="text" size="small">Edit</el-button>
          </template>
        </el-table-column>
        </el-table>
      <el-button type="warning"v-on:click="updateEdit()">Update</el-button>
    </template>
      <el-form >
        <el-form-item  ref="form" :model="form" label-width="0px">
          <el-button type="danger"v-on:click="clearTable">ClearAll</el-button>
        </el-form-item>
        <label>Change Course : </label>
        <input type="file" accept=".json, .txt" v-on:change="onFileChange"></input>
      </el-form>
    </div>
    </keep-alive>
    <hr> <!--Input form===========================================-->
    <h2>Input Field</h2>
    <div>
      <div id="app">
        <el-form ref="form" :model="form" label-width="120px">
            <el-form-item label="Group : ">
              <el-input v-model.number="form.group" type="number"></el-input>
            </el-form-item>
          <!-- <el-row>
            <el-col :span="24">
              <span>No :
                <el-input v-model="form.no"></el-input></span>
            </el-col>
            <el-col :span="24">
              <span>Group :
                <el-input v-model="form.group"></el-input></span>
            </el-col>
          </el-row> -->
          <el-form-item label="Lecturer Code : ">
            <el-input v-model.trim="form.lecturerCode"></el-input>
          </el-form-item>

          <el-form-item label="Start Time : ">
            <el-time-select v-model="form.start" :picker-options="{
                start: '08:00',
                step: '01:00',
                end: '21:00'
              }" placeholder="Select time">
            </el-time-select>
          </el-form-item>
          <el-form-item label="End Time : ">
            <el-time-select v-model="form.end" :picker-options="{
                start: '08:00',
                step: '01:00',
                end: '21:00'
              }" placeholder="Select time">
            </el-time-select>
          </el-form-item>
          <el-form-item label="Location : ">
            <el-input v-model.trim="form.location"></el-input>
          </el-form-item>
          <el-form-item label="Types : ">
            <el-select v-model="form.types" placeholder="please select class type">
              <el-option label="Lecture (K)" value="K"></el-option>
              <el-option label="Tutorial (T)" value="T"></el-option>
              <el-option label="Lab (L)" value="L"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" v-on:click="addTo">Add</el-button>
            <el-button type="danger"v-on:click="clear">Clear</el-button>
          </el-form-item>
          <el-form-item label="Filename : ">
            <el-input v-model="filename"></el-input>
            <el-button type="success" v-on:click="save">Save</el-button>
          </el-form-item>
        </el-form>
        </div>
    </div>
  </div>
</template>

<!-- <script src="//unpkg.com/element-ui@2.3.4/lib/index.js"></script> -->
<script>
// var Ctor = Vue.$mount('#generator');

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
            subject_info: JSON.parse(this.$ls.get("table")) || [{
              group: 1,
              lecturerCode: "ABC",
              location: "DK1",
              start: "9.00",
              end: "10.00",
              types: "K"
            },
            {
              group: 2,
              lecturerCode: "DEF",
              location: "DK2",
              start: "10.00",
              end: "11.00",
              types: "L"
            },
            {
              group: 3,
              lecturerCode: "GHK",
              location: "DK3",
              start: "11.00",
              end: "12.00",
              types: "T"
            }
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
        addTo:function(index){
          // var index = this.subject_info.findIndex(i => i.no === this.form.no);
          // if (index !== -1) {
          //   // this.$set(this.subject_info, index, this.form);
          //   // this.subject_info[index] = this.form;
          //   // this.subject_info.push();
          //   const h = this.$createElement;
          //   this.$notify({
          //     title: 'Warning',
          //     message: h('i', { style: 'color: teal' }, 'Cannot add data already exist')
          //   });
          // } else {
            this.subject_info.push(this.form);

          this.$ls.set("table", JSON.stringify(this.subject_info));
        },
        clear:function(){
          this.form.no = "";
          this.form.group = "";
          this.form.lecturerCode = "";
          this.form.location = "";
          this.form.start = "";
          this.form.end = "";
          this.form.types = "";
        },
        save:function download(filename, text) {
            var element = document.createElement('a');
            element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(this.subject_info)));
            element.setAttribute('download', this.filename);

            element.style.display = 'none';
            document.body.appendChild(element);

            element.click();

            document.body.removeChild(element);
            // this.$ls.set("table", JSON.stringify(this.subject_info));
        },
        // saveFile: function() {
        //   const data = JSON.stringify(this.arr)
        //   const blob = new Blob([data], {type: 'text/plain'})
        //   const e = document.createEvent('MouseEvents'),
        //   a = document.createElement('a');
        //   var filename = this.filename;
        //   a.download = "test.json";
        //   a.href = window.URL.createObjectURL(blob);
        //   a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
        //   e.initEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        //   a.dispatchEvent(e);
        // },
        deleteRow:function(index, rows) {
          console.log(index);
          rows.splice(index, 1);
          // this.subject_info.splice(index, 1);
          this.$ls.set("table", JSON.stringify(this.subject_info));
        },
        edit:function(index, rows){
          // var toEdit = rows.slice(index, index + 1);
          var toEdit = rows[index];
          this.form.no = toEdit.no;
          this.form.group = toEdit.group;
          this.form.lecturerCode = toEdit.lecturerCode;
          this.form.location = toEdit.location;
          this.form.start = toEdit.start;
          this.form.end = toEdit.end;
          this.form.types = toEdit.types;
          this.$ls.set("table", JSON.stringify(this.subject_info));
          this.nowEdit = true;
          this.nowIndex = index;
        },
        updateEdit: function(){
            this.$set(this.subject_info, this.nowIndex, this.form);
            // // this.subject_info[index] = this.form;
            // // this.subject_info.push();
            console.log(this.form, this.subject_info);

          this.$ls.set("table", JSON.stringify(this.subject_info));
        },
        clearTable: function(){
          var arrLength = this.subject_info.length;
          for(let i=0; i<arrLength; i++){
            this.subject_info.splice(0, 1);
          }
        },
        // check:function(){
        //   // Check for the various File API support.
        //   if (window.File && window.FileReader && window.FileList && window.Blob) {
        //     // Great success! All the File APIs are supported.
        //     console.log("support API")
        //   } else {
        //     alert('The File APIs are not fully supported in this browser.');
        //   }
        // },
        // onChange: function(){
        //   this.$ls.set("table", JSON.stringify(this.subject_info));
        //   console.log("jbkg");
        // },
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
              this.$ls.set("table", JSON.stringify(x));
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

</style>
