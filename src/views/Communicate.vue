<template>
  <div class="home">
    <div class="main">
      <!-- 头部区域 -->
      <div class="header">
        <img src="../assets/logo.png" class="header_img" id="img1" />
        <div class="header_name">武汉达冠公司在线为您服务</div>
      </div>
      <div class="body">
        <!-- 聊天框部分 -->
        <div class="communication">
          <div class="communication_talk" ref="communication_talk">
            <!-- 历史记录 -->
            <div class="more">点击加载更多</div>
            <div
              class="chat"
              :style="item.userId == userId ? 'flex-direction:row-reverse' : ''"
              v-for="item in MessageList"
              :key="item.id"
            >
              <!-- 用户头像信息 -->
              <div class="user_head">
                <img
                  :src="
                    item.userId == userId
                      ? require('../assets/user.png')
                      : require('../assets/server.png')
                  "
                  :class="
                    item.userId == userId
                      ? 'communication_img2 '
                      : 'communication_img1'
                  "
                />
              </div>
              <!-- 用户聊天信息 -->
              <div class="user_message">
                <div
                  :style="item.userId == userId ? 'float:right' : 'left'"
                  :class="
                    item.userId == userId
                      ? 'communication_message1'
                      : 'communication_message'
                  "
                >
                  {{ item.content }}
                </div>
              </div>
              <!-- 时间显示区域 -->
              <div class="user_time">
                {{ item.time }}
              </div>
            </div>
          </div>
          <!-- 输入框 -->
          <div class="textinput">
            <textarea
              placeholder="请输入您要咨询的问题"
              class="texttype"
              id="texttype"
              style="outline: none; "
              v-model="contentText"
              ref="sendMsg"
              @keyup.enter="sendup"
            ></textarea>
            <button
              class="user_btn"
              style="float:right; width:80px; height:30px"
              :class="{ ['user_btn_active']: contentText }"
              @click="sendup"
            >
              发送
            </button>
          </div>
        </div>
        <!-- 常用问题部分 -->
        <div class="common">
          <!-- 温馨部分 -->
          <div class="common_communicate">
            <p>Hi 您好</p>
            <p>很高兴为您服务</p>
            <h3>欢迎来到本公司的在线客服</h3>
            <h3>您的疑问会在这里被尽数解答</h3>
          </div>
          <div class="common_problem">
            <h3 class="common_font">常见问题</h3>
            <div
              class="problem"
              v-for="it in Question"
              :key="it.id"
              @click="sendupQuestion(it.id)"
              ref="sendQuestion"
            >
              <a href="javascript:void(0)">{{ it.content }}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      MessageList: [
        {
          userId: "1",
          content: "今天天气很好!很高兴为您服务",
          time: "",
        },
        {
          userId: "2",
          content:
            "图书馆可通过Email和微信向读者发送流通通知（包括图书到期提醒、过期通知、催还通知、取预约书通知以及取消预约通知等）,登记了Email地址的读者，直接通过 Email接收流通通知。登记了手机号并且绑定“清华大学信息服务”微信企业号的读者，可通过微信接收流通通知。 登记方法：1、新生通过网络开通借书权限过程中，Email是必填项，手机号码和绑定微信是可选项。2、点击图书馆主页上“我的图书馆”按钮，输入学生证号和 info密码，进入“我的图书馆”页面，点击页面上的“个人资料”选项卡，点击“修改”，按提示登记或修改“我的邮箱地址”和“我的手机号码”，同时可以勾选“希望接收微信通知（必须先绑定微信）”，提交即可生效。",
          time: "",
        },
      ],
      Question: [
        { id: "1", content: "公司工作时间?" },
        { id: "2", content: "公司办公地点?" },
        { id: "3", content: "公司业务范围?" },
        { id: "4", content: "公司联系方式?" },
      ],
      userId: "2",
      contentText: "", // 输入框里面的值
    };
  },
  methods: {
    // 将滑轮滚到最下面
    scrollBottm() {
      let el = this.$refs["communication_talk"];
      el.scrollTop = el.scrollHeight;
    },
    // 将输入框内容渲染到对话框里面
    sendup() {
      var that = this;
      var date = new Date();
      var year = date.getFullYear(); //当前年份
      var month = date.getMonth(); //当前月份
      var data = date.getDate(); //天
      var hours = date.getHours(); //小时
      var minute = date.getMinutes(); //分
      var second = date.getSeconds(); //秒
      // 时间没到两位数自动补零
      function fnW(str) {
        var num;
        str >= 10 ? (num = str) : (num = "0" + str);
        return num;
      }
      var _time =
        year +
        "/" +
        fnW(month + 1) +
        "/" +
        fnW(data) +
        " " +
        fnW(hours) +
        ":" +
        fnW(minute) +
        ":" +
        fnW(second);
      this.$refs["sendMsg"].focus();
      if (!this.contentText) {
        return;
      }
      this.MessageList.push({
        content: this.contentText,
        userId: 2,
        time: _time,
      });
      // let params = {
      //   userId:that.userId,
      //   msg:that.contentText
      // }
      // this.MessageList.push(JSON.stringify(params))
      this.contentText = "";
      setTimeout(() => {
        that.scrollBottm();
      }, 100);
    },
    // 将问题直接渲染到聊天框
    sendupQuestion(index) {
      var that = this;
      this.MessageList.push({
        userId: 2,
        content: this.Question[index - 1].content,
      });
      setTimeout(() => {
        that.scrollBottm();
      }, 100);
    },
  },
};
</script>
<style scoped>
.main {
  width: 800px;
  height: 600px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 15px 15px 15px 15px;
}

.header {
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  background-color: #409eff;
  justify-content: space-between;
  border-radius: 15px 15px 0 0;
}

.header_img {
  width: 35px;
  height: 35px;
  position: relative;
  left: 15px;
}

.header_name {
  color: white;
  font-size: 20px;
}

.body {
  display: flex;
  height: 560px;
  width: 100%;
  box-sizing: border-box;
  border-radius: 0 0 15px 15px;
  border: 3px solid #409eff;
}

.communication {
  height: 100%;
  width: 65%;
}
.communication_talk::-webkit-scrollbar {
  width: 5px;
}
.common {
  height: 100%;
  width: 35%;
  border-left: 1px solid #409eff;
}

.common_communicate {
  height: 40%;
  width: 100%;
}

.common_communicate > p {
  font-size: 30px;
  font-weight: bold;
  color: #409eff;
  margin: 0;
  padding: 0;
  padding-top: 10px;
}

.common_problem {
  height: 60%;
}

.common_font {
  color: #409eff;
  font-size: 15px;
}
/* .problem{
  border:1px red solid;
} */
.problem > a {
  height: 50px;
  line-height: 50px;
  padding: 0 12px;
  border-radius: 25px;
  margin-right: 6px;
  margin-bottom: 8px;
  background-color: #f8f5f8;
  text-decoration: none;
  color: black;
  font-size: 15px;
  box-shadow: 0px 0px 5px rgb(209, 208, 208);
}

.problem > a:hover {
  color: #409eff;
  transition: 0.3s;
}
.communication_talk {
  height: 75%;
  width: 100%;
  border-bottom: 2px solid #409eff;
  position: relative;
  display: block;
  overflow: auto;
  padding-bottom: 15px;
}
.more {
  color: #333;
  font-size: 15px;
  cursor: pointer;
  text-align: center;
}
.more:hover {
  color: #409eff;
}
.chat {
  min-height: 80px;
  padding:10px;
  margin-right:0 ;
  display: flex;
  position: relative;

}
.user_time {
  font-size: 5px;
  width: 150px;
  height: 10px;
  color: rgb(127, 127, 127);
  line-height: 10px;
  position: absolute;
   top:0;
  text-align: center;
}

.communication_img1 {
  height: 50px;
  width: 50px;
  float: left;
}
.communication_message {
  padding: 15px;
  max-width: 300px;
  margin: 0;
  border-radius: 10px; /*设置矩形四个角为圆角*/
  background-color: #409eff;
  color: white;
  position: relative;
  box-sizing: border-box;
  max-width: 350px;
  float: left;
  left: 10px;
  top: 10px;
  min-height: 40px;
  word-break: break-all;
}
.communication_message:before {
  /*伪元素必须添加content*/
  content: "";
  width: 0;
  height: 0;
  /*IE6下，height:0;不顶用，可使用font-size:0; + overflow:hidden;修复此问题*/
  font-size: 0;
  overflow: hidden;
  display: block;
  border-width: 8px;
  border-color: #409eff transparent transparent transparent;
  /*为了兼容IE6，所有设置为透明（transparent）的边，需要设置为dashed；有颜色的边设置为solid*/
  border-style: solid dashed dashed dashed;
  position: absolute; /*绝对定位不占位置*/
  top: 15px; /* 向下移动 矩形的高度 + 矩形的上下内边距 + 下边框粗细*/
  left: -15px; /*相对于矩形宽度的位置*/
  -ms-transform: rotate(90deg); /* IE 9 */
  -webkit-transform: rotate(90deg); /* Safari and Chrome */
  transform: rotate(90deg);
}
.user_head {
  height: 65px;
  width: 65px;
  border-radius: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e0e0e0;
}
.communication_img2 {
  height: 50px;
  width: 50px;
  float: right;
}
.communication_message1 {
  padding: 15px;
  max-width: 300px;
  margin: 0 auto;
  border-radius: 10px; /*设置矩形四个角为圆角*/
  background-color: #409eff;
  color: white;
  position: relative;
  box-sizing: border-box;
  max-width: 350px;
  right: 10px;
  top: 10px;
  white-space: pre-line;
  word-wrap: normal;
  min-height: 40px;
  word-break: break-all;
}
.communication_message1:before {
  /*伪元素必须添加content*/
  content: "";
  width: 0;
  height: 0;
  /*IE6下，height:0;不顶用，可使用font-size:0; + overflow:hidden;修复此问题*/
  font-size: 0;
  overflow: hidden;
  display: block;
  border-width: 8px;
  border-color: #409eff transparent transparent transparent;
  /*为了兼容IE6，所有设置为透明（transparent）的边，需要设置为dashed；有颜色的边设置为solid*/
  border-style: solid dashed dashed dashed;
  position: absolute; /*绝对定位不占位置*/
  top: 15px; /* 向下移动 矩形的高度 + 矩形的上下内边距 + 下边框粗细*/
  right: -13px; /*相对于矩形宽度的位置*/
  -ms-transform: rotate(-90deg);
  -webkit-transform: rotate(-90deg);
  transform: rotate(-90deg);
}
.textinput {
  width: 100%;
  height: 25%;
  box-sizing: border-box;
  border-radius: 0 0 0 15px;
}
.texttype {
  width: 100%;
  height: 60%;
  word-break: break-word;
  border: 0;
  resize: none;
  padding: 10px;
  margin: 0;
  box-sizing: border-box;
  font-size: 20px;
}
.texttype::-webkit-scrollbar {
  width: 5px;
}
.user_btn {
  background: #e0e0e0;
  color: white;
  text-align: center;
  border-radius: 0.2rem;
  transition: 0.5s;
}
.user_btn_active {
  background-color: #409eff;
}
</style>
