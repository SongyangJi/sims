# 个人总结
花了两三个时间学习知识，从最基础的html、css、JavaScript再到前端框架Vue的学习，
再到SpringMVC的学习，SpringBoot的使用，以及持久层框架Mybatis的学习，中途还恶补了MySQL的知识。

实际写代码的时间零零散散也就两个礼拜。
项目用的技术都是一些成熟的、主流的技术。
没有什么技术上的深度，设计到安全、并发什么的就更没有考虑了，业务逻辑也很简单，非常适合新手来练手。

希望以后做的项目更好吧！


# 业务逻辑
## 管理员权限模块
### 学生管理
+ 添加学生信息（单条导入、批量导入）
	+ 单条导入
	单条导入一个完整的学生的信息
	+ 批量导入
	批量导入若干个学生的学号

	注意：在管理员将学生信息导入之后，该名学生的信息才存储在数据里，学生自己没有注册用户的权限,而后提醒该学生尽快修改自己的密码。

+ 查看学生的基本信息
	支持管理员查看所有学生的信息，并且支持根据学生学号进行ID的精确查询。	

	
### 课程管理
+ 添加课程信息
	因为后面有选课功能，所以课程的导入需要管理员导入，当然导入也有可能批量导入，不过为了简单，暂定单条导入。

+ 查看某一门课程的课程信息 
	

### 成绩管理
+ 添加某个课程学生的考试成绩
+ 查看某个学生的所有考试成绩
+ 查看某一门课程的所有人的考试成绩。


## 学生权限模块
学生只有“读”的权限以及少部分写的权限。
+ 查看自己的个人信息
+ 查看自己的选课信息
+ 查看自己的成绩


# 数据库设计
+ **此次数据库设计原则：**

维护最基本的、能够支持业务逻辑的信息即可，不必面面俱到，不必刻意追求和现实情况的高度吻合。
并且，数据库一旦建好，轻易不改！
## 建表
### 学生基本信息
学号 ： 12位纯数字（如201900001234）(也是唯一id)
登录密码： 初始化时默认为 123456 
姓名、性别（0或1）、出生日期（格式例如：1999-09-05）
专业：软件工程
系所：软件学院 
班级：软件19.1 （字符串）
政治面貌：共青团员
年级：2019
 联系电话：158xxxxxxxx(纯数字)
 籍贯：山东省济南市高新区

### 课程信息
课程号：03028877（8位纯数字）
课程名：Web技术
学分： 3学分
课程属性： 必修/限选/任选
开课学院：软件学院
任课老师：xxx
上课周次：格式为 x-x（例如3-13）字符串

### 学生成绩
+ 某一课程的成绩
	学生基本信息+课程信息+分数
+ GPA
动态查询，不做持久化存储。


### 学生社会成果
暂略。
 
 

## 表的关联
+ 学生表和课程表显然是一个**多对多的关系**，需要需要再建一张中间表。
+ 学生成绩表，只需要比上述的中间表多一个字段。

## SQL脚本


# 数据库
## MySQL
数据库选择 MySQL。

建库建表的SQL 脚本


## Mybatis
持久层框架使用 Mybatis

### SpringBoot集成下的Mybatis 配置

```xml
        <!-- spring-boot场景下的 mybatis 启动器 -->
        <dependency>
            <groupId>org.mybatis.spring.boot</groupId>
            <artifactId>mybatis-spring-boot-starter</artifactId>
            <version>2.1.3</version>
        </dependency>
```


### application.yml配置

```yaml
mybatis:
  configuration:
#    mybatis的日志输出
    log-impl: org.apache.ibatis.logging.stdout.StdOutImpl
  #  mapper文件
  mapper-locations: classpath:mapper/*.xml
  #  配置类型别名，避免每次冗余的全限定名
  type-aliases-package: com.jsy.simsserver.pojo

#日志输出
logging:
  level:
    #这个指定你的dao层，也就是mapper文件的所在包
    com/jsy/simsserver/mapper: DEBUG
```

### 持久层结构
  + 在mapper层约定映射接口
StudentMapper.java
```java
@Mapper
@Repository
public interface StudentMapper {

    void insertStudent(Student student);

    Student selectStudent(Long sid);
    // ………………
}
```
   +  在resources/mapper/StudentMapper.xml里编写SQL语句，实现ORM(对象关系映射)
    	
```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">

<mapper namespace="com.jsy.simsserver.mapper.StudentMapper">

    <insert id="insertStudent" parameterType="Student">
        INSERT INTO student(sid,pwd,sname,gender,birth,profession,faculty,s_class,grade,phone,politics_status,address,head_url)
        VALUES (#{sid},#{pwd},#{sname},#{gender},#{birth},#{profession},#{faculty},#{s_class},#{grade},#{phone},#{politics_status},#{address},#{head_url});
    </insert>
    
	<!--  等等  -->
	
</mapper>
```

#  SpringBoot和SpringMVC
项目采用MVC设计思想。
下面简单介绍一下，是SpringBoot集成下的采用MVC架构的Web项目。

项目结构图：

```
├── java
│   └── com
│       └── jsy
│           └── simsserver
│               ├── SimsServerApplication.java
│               ├── controller
│               │   ├── CourseController.java
│               │   ├── LoginController.java
│               │   ├── OSSUploadController.java
│               │   ├── ScoreController.java
│               │   ├── StudentController.java
│               │   └── TestController.java
│               ├── mapper
│               │   ├── CourseMapper.java
│               │   ├── ScoreMapper.java
│               │   └── StudentMapper.java
│               ├── pojo
│               │   ├── Achievement.java
│               │   ├── Admin.java
│               │   ├── Course.java
│               │   ├── OssSign.java
│               │   ├── Score.java
│               │   └── Student.java
│               ├── reponse
│               │   ├── ErrorMessage.java
│               │   ├── Message.java
│               │   └── SuccessMessage.java
│               └── service
│                   ├── CourseService.java
│                   ├── ScoreService.java
│                   ├── StudentService.java
│                   └── serviceImpl
│                       ├── CourseServiceImpl.java
│                       ├── ScoreServiceImpl.java
│                       └── StudentServiceImpl.java
└── resources
    ├── application.yml
    ├── banner.txt
    └── mapper
        ├── CourseMapper.xml
        ├── ScoreMapper.xml
        └── StudentMapper.xml
```


## pojo
编写一些实体类。
使用了lombok插件，避免编写大量的模板代码（`getter`、`setter`等等）
```java
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Student {
    private Long sid;           // 学号
    private String pwd;         // 密码
    private String sname;       // 姓名
    private String gender;      // 数据库用枚举类型
    private String birth;       // 格式为：1999-09-05
    private String profession;  // 专业
    private String faculty;     // 院系
    private String s_class;     //班级
    private String grade;       // 年级
    private String phone;       // 电话
    private String politics_status; // 政治面貌
    private String address;     //籍贯
    private String head_url;         //学生照片的URL
}
```

## controller
介绍几个最常用的注解：
+ @RestController = @Controller + @ResponseBody
在IOC容器中注册一个controller对象，并且默认使用返回Json格式的数据。
+ @Resource 
来自javax，用途和spring下的@Autowire注解功能类似，实现自动装配。
+ @PostMapping
仅在浏览器使用Post请求时触发该方法。
还有@GetMapping等等其他类似的注解。

```java
@RestController
public class StudentController {

    @Resource(name = "studentService")
    StudentService studentService;

    /**
     * @param student 完整User对象
     * @return
     */
    @PostMapping("/student")
    public ResponseEntity<Message> addStudent(@RequestBody Student student){
        int code = studentService.addStudent(student);
        if(code==0){
            return ResponseEntity.status(HttpStatus.CREATED).body(new SuccessMessage("成功添加一个用户"));
        }
        if(code==1){
            return ResponseEntity.accepted().body(new ErrorMessage("用户已经存在"));
        }
        return ResponseEntity.badRequest().body(new ErrorMessage("内部错误"));
    }
}
```

## service
采用面向接口的编程的思想。
service层约定出接口。
在serviceImpl包里面实现接口，项目的课拓展性更好。
例如：
```java
public interface StudentService {

    int addStudent(Student student);

    int addStudent(Long sid);

    int addStudents(List<Long> sidList);

    List<Student> queryAllStudents();

    Student queryStudentByID(Long uid);

    List<Student> queryStudentByName(String name);
    
    void removeStudent(Long sid);

    void updateStudent(Student student);
    
}
```

```java
// 在service有有多个实现的时候，要给@Service添加不同的Bean的名称
@Service("studentService")
public class StudentServiceImpl implements StudentService {

    @Resource
    StudentMapper studentMapper;	
    // 在这里编写实现接口的方法。
}
```

## mapper
Mybatis部分已经介绍，见上。


# Vue
采用 Vue-CLi创建的项目的结构（有后期项目的更新，可能具体文件与实际不符，但结构基本不变）。

```
├── App.vue
├── assets
│   └── logo.png
├── components
│   ├── BottomBar.vue
│   ├── HeadBar.vue
│   ├── SiderBar.vue
│   ├── UpLoad.vue
│   ├── UpLoadImages.vue
│   ├── UpLoadSingleImage.vue
│   ├── achievement
│   │   ├── AddAchievement.vue
│   │   └── DisplayAchievement.vue
│   ├── course
│   │   ├── AddCourses.vue
│   │   └── DisplayCourses.vue
│   ├── score
│   │   ├── AddScoreByCourse.vue
│   │   ├── QueryScoreByCourse.vue
│   │   └── QueryScoreByStudent.vue
│   └── students
│       ├── AddAmountOfStudents.vue
│       ├── AddSingleStudent.vue
│       ├── DisplayAllStudents.vue
│       └── SearchStudent.vue
├── main.js
├── router
│   └── index.js
├── store
│   └── index.js
├── utils
│   └── api.js
└── views
    ├── AddScore.vue
    ├── AddStudents.vue
    ├── DisplayScore.vue
    ├── DisplayStudent.vue
    ├── Home.vue
    └── Login.vue
    ……
└── vue.config.js  （与src同级的配置文件）
```

## 单文件组件结构
举一个简单的例子。
```javascript
<!-- 模板 —— 具体的页面组件 -->
<template>
    <div class="class_1"></div>
</template>


<!-- 脚本 -->
<script>
    import {postRequest} from "../utils/api";
    import {getRequest} from "../utils/api";
    //凡是要使用的外部函数、组件都需要导入
    export default {
        name: "SingleFileComponent",
        // 状态
        data(){
            // 以对象的形式返回 
            return{
                state:1,
                state_array:[],
                state_object:{
                    
                }
            //    …………
            }
        },
        // 方法，比如按钮的触发事件，一些支持方法等等。
        methods:{
            fun_a(){
                
            },
            fun_b(variable){
                return true;
            }
        //    …………
        },
        // 局部组件（需要import进来)
        components:{
            //…………
        },
        // 生命周期函数，当然还有其他，mounted是在页面加载完之后，挂载到vue之后的钩子函数
        mounted() {
        //   比如，页面加载完页面之后，就向后端请求数据
        }
    }
</script>

<!-- 样式 -->
<style scoped>

    .class_1{
    }
    
</style>
```

## 反向代理配置
在vue.config.js文件下
```javascript
module.exports={
    devServer:{
        proxy:{
            "/api":{
                target:'http://localhost:8088',//访问的服务器地址
                changeOrigin:true,//true为开启代理
                //secure: true, // 如果是https接口，需要配置这个参数
                pathRewrite:{

                    '^/api': ''//路径的替换规则
                    /*
                     *这里的配置是正则表达式，以/api开头的路径将会被‘/'替换掉
                     *假如后台文档的接口是 "https://www.cyclv.com/admin/login"
                     *前端调取API接口应写：axios.get('/api/admin/login')
                     */
                }
            }
        }
    }
}
```

## axios
在api.js下简单封装了与后端交互的代码，主要考虑到如果以后交互技术的变化以方便拓展。

```javascript
import axios from 'axios'

export const postRequest = (url,data) => {
    return axios.post(url,data);
}

export const getRequest = (url)=> {
    return axios.get(url);
}


export const deleteRequest = (url)=> {
    return axios.delete(url);
}

export const putRequest = (url,data)=> {
    return axios.put(url,data);
}

```

具体代码片段，如：
```javascript
   const api = 'api/login';
   postRequest(api, {
       aid: this.loginForm.aid,
       pwd: this.loginForm.pwd
   })
       .then(response => {
           if (response.status == 201) {
               // 在 store 的 state存储 状态
               this.$store.commit('login', this.loginForm);
               this.$router.replace({path: '/home'});
           } else {
               alert("密码错误！");
           }
       })
       .catch(res => {
           this.console.log("内部错误");
       })
```

## 路由

```javascript
//import …………

Vue.use(VueRouter)

const routes = [
  {
    path:'/login',
    name:'Login',
    component:Login
  },
  {
    path: '/home',
    name:'Home',
    component: Home,
    meta:{
      // 表明页面需要进行拦截
      requiredAuth: true
    },
    children :[
      {
        path: 'display-students',
        name: 'DisplayStudent',
        component:DisplayStudent
      },
      {
        path: 'add-students',
        name: 'AddStudents',
        component: AddStudents
      },
      {
        path: 'display-courses',
        name: 'DisplayCourses',
        component: DisplayCourses
      },
      {
        path: 'add-courses',
        name: 'AddCourses',
        component: AddCourses
      },
      {
        path: 'add-achievement',
        name: 'AddAchievement',
        component: AddAchievement
      },
      {
        path: 'display-achievement',
        name: 'DisplayAchievement',
        component: DisplayAchievement
      },
      {
        path: 'add-score',
        name: 'AddScore',
        component: AddScore
      },
      {
        path: 'display-score',
        name: 'DisplayScore',
        component: DisplayScore
      }
    ]
  },
  {
    path: '*',
    redirect:'/login'
  }

]

const router = new VueRouter({
  routes
})

export default router

```

## store
这里只是简单的使用store技术，用于存储一些全局的状态。
这里存储了用户的登录状态。
```javascript
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

/*

 sessionStorage 只有关闭页面、退出浏览器才会清除
 localStorage 除非只有主动清除，否则不会清除

 */

export default new Vuex.Store({
  state: {
    administrator:{
      aid: window.sessionStorage.getItem('admin' || '[]')==null ? null: JSON.parse(window.sessionStorage.getItem('admin' || '[]')).aid
    }
  },
  mutations: {
    login(state,admin){
      state.administrator = admin;
      // console.log('到这',admin);
      window.sessionStorage.setItem('admin',JSON.stringify(admin));
    }
  },
  actions: {
  },
  modules: {
  }
})

```

## 路由钩子函数
这里简单实现了登录拦截器的功能。
在main.js文件里：
```javascript
router.beforeEach((to,from,next) => {
  if(to.meta.requiredAuth){
    if(store.state.administrator.aid){
      next();
    }else{
      // 在登录成功后自动路由到目标位置
      next({
        path:'login',
        query:{redirect:to.fullPath}
      })
    }
  }else{
    next();
  }
})
```



## ElementUI
组件开发的利器，Vue的好伙伴，很容易上手，官方也给了详尽的、友好的文档，不再赘述。
