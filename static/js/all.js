$("#btn_uuid").click(function () {
  // var serch = $("#big_name").val()
  // window.open(encodeURI("./data.html?serch=" + serch));
  // var url = encodeURI("./data.html?serch=" + serch);
  // window.location.href = url;

  // 原地打开新窗口可行  不乱码
  var searchText = jQuery.trim($("#big_name").val());
  var searchUrl = encodeURI("./data.html?searchText=" + searchText); //使用encodeURI编码
  window.location.href = searchUrl;

})
var index;
let idd;

function add () {

  layui.use('layer', function () {
    var layer = layui.layer;
    index = layer.open({
      type: 1,
      shade: 0.5,
      anim: 1,
      shadeClose: true, //开启遮罩关闭
      title: "新增类别",
      area: ['500px', '200px'],
      content: $("#lei"),

      // closeBtn: 0, //不显示关闭按钮

    });

  });
  formReset()
}

function gettree () {
  // $.ajax({
  //   type: "post",
  //   url: basepath + "/search/folder/getDirTree",
  //   // data: {
  //   //   title: Bie,
  //   // },
  //   async: false,
  //   dataType: "json",
  //   success: function (res) {
  //     // console.log(res)
  //     data = res.data
  //   }
  // });
  var data;
  $.ajax({
    type: "post",
    url: basepath + "/search/folder/getDirTree",
    // data: {
    //   title: Bie,
    // },
    async: false,
    dataType: "json",
    success: function (resut) {
      data = resut.data;
      console.log(data)

    }
  });
  return data;

}

function fisd (doo, poo) {
  console.log(doo, poo)
}


layui.use(['tree', 'form', 'laydate', 'table', 'layer',], function () {
  var tree = layui.tree,
    form = layui.form,
    layer = layui.layer;
  laydate = layui.laydate;
  var table = layui.table;
  var index0pen;
  // let data;
  var Bie = $("#Bie").val






  //开启节点操作图标
  var inder = tree.render({
    elem: '#test2',
    skin: 'as',
    data: gettree(),
    isopen: true,
    onlyIconControl: true,
    edit: ['add', 'update', 'del'] //操作节点的图标 
    ,
    id: 'treeId',
    click: function (obj) {
      $(".one").css("display", "none")
      $(".two").css("display", "block")
      addfrom();
      // console.log(obj.data); //得到当前节点元素
      // 输入核心信息按钮
      idd = obj.data.id
      // console.log(obj.data)
      $(".guns").html(obj.data.title)
      //节点高亮
      var nodes = document.getElementsByClassName("layui-tree-txt");
      for (var i = 0; i < nodes.length; i++) {
        if (nodes[i].innerHTML === obj.data.title)
          nodes[i].style.color = "red";
        else
          nodes[i].style.color = "#fff";
      }


      // 每点击节点  向后台发送自身id  obj.data.id  返回的舒服  对填入的input字段赋值
      // $("#information-1").val(data.information1)
      // $("#information-1")
      // layer.msg(JSON.stringify(obj.data));
      // console.log(obj.data)

      var type = obj.data.type
      if (type == "file") {
        $(".two").css("display", "none")
        $(".three").css("display", "block")
        $(".msggages").css("display", "block")
        $(".dis").css("display", "block")
        tab();
        $(window).trigger('resize');

        // 再掉一个接口
        var id = obj.data.id
        // console.log(id)
        $.ajax({
          type: "post",
          url: basepath + "/search/getDocUploadList",
          data: {
            id: id
          },
          dataType: "json",
          success: function (res) {
            console.log(res)
            var box = res.data.filebox
            console.log(box)
            $("#information-11").val(box.anjuanbianhao)
            $("#information-22").val(box.danweizhiwu)
            $("#information-33").val(box.chuliqingkuang)
            $("#information-44").val(box.xiansuolaiyuan)
            $("#information-55").val(box.xiansuoqingkuang)
            $("#information-66").val(box.wentixingzhi)
            $("#information-77").val(box.lijuandanwei)
            $("#information-88").val(box.cunchubianhao)
            $("#information-99").val(box.chengbandanwei)
            $("#information-1010").val(box.anjiandaihao)
            $("#test13").val(box.chabanshijian);
            $("#test14").val(box.chajieshijian);

          }
        });

      } if (type == "filebox") {
        $(".two").css("display", "block")
        $(".three").css("display", "none")
        $(window).trigger('resize');
        var id = obj.data.id
        // console.log(id)
        $.ajax({
          type: "post",
          url: basepath + "/search/filebox/get",
          data: {
            id: id
          },
          dataType: "json",
          success: function (res) {
            console.log(res)
            $("#information-1").val(res.data.anjuanbianhao)
            $("#information-2").val(res.data.danweizhiwu)
            $("#information-3").val(res.data.chuliqingkuang)
            $("#information-4").val(res.data.xiansuolaiyuan)
            $("#information-5").val(res.data.xiansuoqingkuang)
            $("#information-6").val(res.data.wentixingzhi)
            $("#information-7").val(res.data.lijuandanwei)
            $("#information-8").val(res.data.cunchubianhao)
            $("#information-9").val(res.data.chengbandanwei)
            $("#information-10").val(res.data.anjiandaihao)
            $("#test11").val(res.data.chabanshijian);
            $("#test12").val(res.data.chajieshijian);

          }
        });
      } if (type == "category") {
        $(".one").css("display", "block")
        $(".two").css("display", "none")
        $(".three").css("display", "none")
        $(window).trigger('resize');
      } if (type == "dir") {
        $(".one").css("display", "none")
        $(".two").css("display", "none")
        $(".three").css("display", "block")
        $(".msggages").css("display", "none")
        $(window).trigger('resize');
        $(".dis").css("display", "none")

        // 再掉一个接口
        var id = obj.data.id
        // console.log(id)
        $.ajax({
          type: "post",
          url: basepath + "/search/getDocUploadList",
          data: {
            id: id
          },
          dataType: "json",
          success: function (res) {
            // console.log(res)
            var box = res.data.filebox
            console.log(box)
            $("#information-11").val(box.anjuanbianhao)
            $("#information-22").val(box.danweizhiwu)
            $("#information-33").val(box.chuliqingkuang)
            $("#information-44").val(box.xiansuolaiyuan)
            $("#information-55").val(box.xiansuoqingkuang)
            $("#information-66").val(box.wentixingzhi)
            $("#information-77").val(box.lijuandanwei)
            $("#information-88").val(box.cunchubianhao)
            $("#information-99").val(box.chengbandanwei)
            $("#information-1010").val(box.anjiandaihao)
            $("#test13").val(box.chabanshijian);
            $("#test14").val(box.chajieshijian);

          }
        });
      }
      // 每个节点的id
      // layer.msg(JSON.stringify(obj.data.id))
      // 判断返回的结果res.data中是否存在某个属性
      // a = {
      //   b: 1
      // }
      // a.hasOwnProperty('b') == > true
      // a.hasOwnProperty('c') == > false
      // 或者
      // 'b' in a == > true
      // 'c' in a == > false
    },
    operate: function (obj) {
      var type = obj.type; //得到操作类型：add、edit、del
      var data = obj.data; //得到当前节点的数据
      var elem = obj.elem; //得到当前节点元素
      // var objId = data.id; //当前节点id
      //Ajax 操作
      console.log(data)

      var id = data.id; //得到节点索引
      if (type === 'add') { //增加节点
        $("#NodeID").val(id);

        index0pen = layer.open({
          type: 1,
          title: "新增",
          skin: 'layui-layer-demo', //样式类名
          // closeBtn: 0, //不显示关闭按钮
          anim: 1,
          shade: 0.5,
          shadeClose: true, //开启遮罩关闭
          area: ['500px', '210px'],
          content: $("#add-node"),

        });

        var comment = $(".ceng")
        // 添加表单的提交
        form.on('submit(addnode)', function (data) {
          var nodeData = data.field;
          addfrom()
          console.log(nodeData)
          $.ajax({
            url: basepath + '/search/folder/addFolder',
            type: 'post',
            dataType: 'json',
            data: {
              title: nodeData.title,
              host: nodeData.id,
              type: nodeData.radiotion
            },
            success: function (r) {
              if (r.status == 0) {
                layer.msg('添加成功', {
                  icon: 6,
                  skin: 'demo'
                });

                // //修改节点名称
                // $("div[data-id='" + nodeData.id + "']").find(".layui-tree-txt").eq(0).html(
                //   nodeData.title).attr("title", nodeData.title);
                // $("div[data-id='" + nodeData.id + "']").find(".layui-tree-entry").eq(0)
                //   .addClass("layui-table-click");
                // inder.data = data;
                // tree.reload('treeId', {
                //   data: gettree()i
                // });
                tree.reload('treeId', { //tree组件的ID,渲染时需要设置
                  //展开操作节点的所有父类节点
                  data: openTree(gettree(), id)
                });
                // gettree()
                // add(obj)
                // $(".tree").load(location.href + " .tree");
                layer.close(index0pen);

                // location.reload()
              } else {
                layer.msg(r.message, {
                  icon: 5,
                  skin: 'demo'
                });
              }
            },
            error: function (s) {
              layer.msg('添加出错了');
            }
          });

          return false;
        });


      } else if (type === 'update') { //修改节点
        //console.log(elem.find('.layui-tree-txt').html()); //得到修改后的内容
        $("#nodeId").val(id);
        $("#Title").val(data.title);
        index0pen = layer.open({
          type: 1,
          title: "编辑",
          skin: 'layui-layer-demo', //样式类名
          // closeBtn: 0, //不显示关闭按钮
          anim: 1,
          shade: 0.5,
          shadeClose: true, //开启遮罩关闭
          area: ['500px', '210px'],
          content: $("#edit-node"),

        });
        // 修改表单的提交
        form.on('submit(editnode)', function (data) {
          var nodeData = data.field;
          console.log(nodeData)
          $.ajax({
            url: basepath + '/search/folder/updateTitle',
            type: 'post',
            dataType: 'json',
            data: {
              title: nodeData.title,
              id: nodeData.id
            },
            success: function (r) {
              if (r.status == 0) {
                layer.msg('修改成功', {
                  icon: 6,
                  skin: 'demo'
                });
                layer.close(index0pen);
                tree.reload('treeId', {});
                tab()

              } else {
                layer.msg('修改失败', {
                  icon: 5,
                  skin: 'demo'
                });
              }
            },
            error: function (s) {
              layer.msg('修改出错了');
            }
          });
          return false;
        });

      } else if (type === 'del') { //删除节点
        $.ajax({
          url: basepath + '/search/folder/delete',
          type: 'post',
          dataType: 'json',
          data: {
            id: id
          },
          success: function (r) {
            if (r.status == 0) {
              layer.msg('删除成功', {
                icon: 6,
                // time: 20000,
                skin: 'demo'
              });
            } else {
              layer.msg('删除失败', {
                icon: 5,
                skin: 'demo'
              });
            }
          },
          error: function (s) {
            layer.msg('删除成功');
          }
        });
      };


    }
  });

  $("#commit").click(function () {
    console.log(idd)
    var anjuanbianhao = $("#information-1").val();
    var xiansuolaiyuan = $("#information-4").val();
    var xiansuoqingkuang = $("#information-5").val();
    var danweizhiwu = $("#information-2").val();
    var wentixingzhi = $("#information-6").val();
    var chuliqingkuang = $("#information-3").val();
    var chabanshijian = $("#test11").val();
    var chengbandanwei = $("#information-9").val();
    var chajieshijian = $("#test12").val();
    var lijuandanwei = $("#information-7").val();
    var cunchubianhao = $("#information-8").val();
    var anjiandaihao = $("#information-10").val();
    var m = $(".input")
    for (var i = 0; i < m.length; i++) {
      if (m[i].value == "" || m[i].value == null) {
        layer.msg('请补全空白信息', {
          icon: 5
        });
        return false
      }
    }
    $.ajax({
      type: "post",
      url: basepath + "/search/filebox/update",
      data: {
        id: idd,
        anjuanbianhao: anjuanbianhao,
        xiansuolaiyuan: xiansuolaiyuan,
        xiansuoqingkuang: xiansuoqingkuang,
        danweizhiwu: danweizhiwu,
        wentixingzhi: wentixingzhi,
        chuliqingkuang: chuliqingkuang,
        chabanshijian: chabanshijian,
        chengbandanwei: chengbandanwei,
        chajieshijian: chajieshijian,
        lijuandanwei: lijuandanwei,
        cunchubianhao: cunchubianhao,
        anjiandaihao: anjiandaihao
      },
      dataType: "json",
      success: function (response) {
        // console.log(res)
        layer.msg('提交成功', {
          icon: 6,
          skin: 'demo'
        });
      }
    });
  })

  var openTree = function (treeData, id) {
    var nodeId = familyTree(treeData, id);//获得操作节点的所有的父类ID数组

    //循环所有节点,在nodeId中的加上展开属性
    function each (data) {
      data.forEach(function (e) {
        console.log(e)
        if (nodeId.indexOf(e.id) !== -1) {
          e.spread = true;
        }
        // if (e.children.length > 0) {
        //   each(e.children);
        // }
      })
    }
    //执行循环
    each(treeData);
    return treeData;
  };
  //获取操作节点的所有父节点
  var familyTree = function (treeData, id) {
    var temp = [];//父节点数组

    var forFn = function (arr, id) {
      //传入所有数组后循环,id=操作节点id的放进数组,并在他的父类子类中继续循环
      for (var i = 0; i < arr.length; i++) {
        var item = arr[i];
        if (item.id === id) {
          temp.push(item.id);
          forFn(treeData, item.pId);
          break;
        } else {
          if (item.children) {
            forFn(item.children, id);
          }
        }
      }
    };

    //执行循环
    forFn(treeData, id);
    return temp;
  }
  //点击按钮展开所有菜单,循环所有节点和子节点改spread属性
  $("[lay-demo='openAll']").click(function () {
    $("#tree_name").val("");
    var treeData = gettree();

    tree.reload('treeId', {
      data: treeData
    })
  });


  // bur.onchange = function () {
  //   consolo.log(bur.value);
  //   if (bur.value == "") {

  //   }
  // }
  $("#file").click(function () {
    // layer.msg('上传功能开启', {
    //   icon: 1
    // });
    // layer.load(); //上传loading
    layer.msg('开始上传...', {
      icon: 16,
      // shade: 0.01,
      time: 0
    })
    $(".dis").css("display", "none")
  })
  $("#end").click(function () {
    tab();
    // 重载tree树
    $("#tree_name").val("");
    var treeData = gettree();

    tree.reload('treeId', {
      data: treeData
    })
    layer.msg('上传功能关闭', {
      icon: 0
    });
    layer.close(layer.msg());

    layer.closeAll('loading'); //关闭loading

    $(".dis").css("display", "block")

    $(window).trigger('resize');

  })



  //搜索节点值
  $('#btn_query').click(function () {
    var name = $("#tree_name").val(); //搜索值
    if (name == '') {
      layer.msg('请输入搜索内容', {
        icon: 7
      });
      tree.reload('treeId', {
        data: gettree()
      });
      return;
    } else {
      $.ajax({
        type: "post",
        url: basepath + "/search/filebox/search",
        data: {
          query: name
        },
        dataType: "json",
        success: function (res) {
          console.log(res)

          // inder.config.res.data = gettree();
          // tree.reload('treeId');
          tree.reload('treeId', { data: res.data });
        }
      });
    }




  })

  var str = $("#test11").val();
  var end = $("#test12").val();
  // 时间选择器
  laydate.render({
    elem: '#test11',
    type: 'datetime'
  });
  //日期时间选择器
  laydate.render({
    elem: '#test12',
    type: 'datetime'
  });



  // 增加大类
  form.on('submit(category)', function (data) {
    var nodeData = data.field;
    console.log(nodeData.title)
    $.ajax({
      url: basepath + '/search/folder/addCategory',
      type: 'post',
      dataType: 'json',
      data: {
        title: nodeData.title,
        // nodeid: nodeData.id
      },
      success: function (r) {
        console.log(r)
        if (r.status == 0) {
          layer.msg('增加成功', {
            icon: 6,
            skin: 'demo'
          });
          layer.close(index);
          tree.reload('treeId', {
            data: gettree()
          });
        } else {
          layer.msg('增加失败', {
            icon: 5,
            skin: 'demo'
          });
        }
      },
      error: function (s) {
        layer.msg('增加出错了');
      }
    });
    return false;
  });






});



function tab () {
  //第一个实例
  layui.use(['tree', 'form', 'laydate', 'table', 'layer', 'laypage', 'util'], function () {

    var $ = layui.$,
      table = layui.table,
      layer = layui.layer,
      laydate = layui.laydate;
    var laypage = layui.laypage;

    var util = layui.util;
    var tree = layui.tree;
    var table = layui.table;
    table.render({
      elem: '#demo',
      height: 180,
      url: basepath + '/search/getDocUploadList' //数据接口
      ,
      // page: true , //开启分页
      where: {
        // userId:userId,
        id: idd,
      }, //如果无需传递额外参数，可不加该参数http-server
      cols: [
        [{
          title: '序号',
          align: 'center',
          type: 'numbers',
          width: 80
        }, {
          field: 'filename',
          title: '标题',
          width: "20%",
          align: 'center'
        }, {
          field: 'ext',
          width: "15%",
          title: '格式',
          align: 'center',
          // templet: function (data) {// 替换数据

          //     if (data.jS == 0) {
          //         return "意向";
          //     } else if (data.jS == 1) {
          //         return "管理员";
          //     } else if (data.jS == 2) {
          //         return "普通用户";
          //     }
          // }
        },

        {
          field: 'createtime',
          width: "25%",
          title: '创建时间',
          align: 'center',
          templet: "<div>{{layui.util.toDateString(d.createtime, 'yyyy-MM-dd HH:mm:ss')}}</div>"
        }, {
          title: '操作',
          field: 'docName',
          align: 'center',
          toolbar: "#barDemo"
        }
        ]
      ],
      done: function (res, curr, count) {

        $('th').css({
          'background-color': '#10a6b4',
          'color': '#fff',
          'font-weight': 'bold'
        })
      },
      parseData: function (res) { //res 即为原始返回的数据

        return {
          "code": res.status, //解析接口状态
          "msg": res.message, //解析提示文本
          "count": res.data.totalCount, //解析数据长度
          "data": res.data.doc //解析数据列表
        };
      },
      // request: {
      //   pageName: 'pageNo' //页码的参数名称，默认：page
      //     ,
      //   limitName: 'pageSize' //每页数据量的参数名，默认：limit
      // }

    });
    //监听表格复选框选择
    table.on('checkbox(demo)', function (obj) {
      console.log(obj);
    });

    //监听工具条
    table.on('tool(demo)', function (obj) {
      // console.log(obj)
      var data = obj.data;
      console.log(data)

      $("#sele option:selected").val(data.userType)

      if (obj.event === 'detail') {
        console.log(data)

        if (data.ext == ".doc") {
          $.ajax({
            type: "post",
            url: basepath + "/search/getDocUri",
            data: {
              id: data.mysqlid
            },
            dataType: "json",
            success: function (res) {
              if (res.status != "0") {
                layer.msg(res.message);
                return;
              }
              var url = res.data;
              // window.open(url);
              if (url != "") {
                window.location.href = url
              }

            }
          });
        }
        if (data.ext == ".pdf") {
          $.ajax({
            type: "post",
            url: basepath + "/search/getPdfUri",
            data: {
              id: data.mysqlid
            },
            dataType: "json",
            success: function (res) {
              console.log(res)
              if (res.status != "0") {
                layer.msg(res.message);
                return;
              }
              var url = res.data;
              if (url != "") {
                window.location.href = url
              }
              // PDFObject.embed("../保温工程专业分包合同.pdf", "body");
              // window.open("./static/pdfjs-2.1.266-dist/web/viewer.html?file=" + res.data);

              // window.location.href = url
            }
          });
        } if (data.ext == ".docx") {
          $.ajax({
            type: "post",
            url: basepath + "/search/getDocUri",
            data: {
              id: data.mysqlid
            },
            dataType: "json",
            success: function (res) {
              console.log(res)
              if (res.status != "0") {
                layer.msg(res.message);
                return;
              }
              var url = res.data;
              if (url != "") {
                window.location.href = url
              }
            }
          });
        }

        var id = obj.data.id

        // var url = "../templates/fllow.html?time=" + time + "&uuid=" + uuid;
        // var url = "./widgets.html?id=" + id

        // window.location.href = url;
        // window.open("./follow.html?id=" + id);


      } else if (obj.event === 'del') {
        layer.confirm('确认删除？', {
          btn: ['确定', '取消'],
          btn1: function (index, layero) {
            //后台执行删除操作
            $.post(basepath + '/search/deleteUploadFile', {
              'id': data.mysqlid,
              'ext': data.ext
            }, function (data) {
              if (data.status == 0) {
                layer.msg("删除成功", {
                  time: 1800,
                  icon: 1
                });
                // 重载tree树
                $("#tree_name").val("");
                var treeData = gettree();

                tree.reload('treeId', {
                  data: treeData
                })
                tab();

              } else {
                layer.msg('删除失败', {
                  time: 1800,
                  icon: 2
                });
              }
            }, 'json');
            layer.close(index);
          },
          btn2: function (index, layero) {
            layer.close(index);
          }
        });
      } else if (obj.event === 'edit') {
        console.log(data)
        if (data.ext == ".doc") {
          $.ajax({
            type: "post",
            url: basepath + "/search/getDocDirUri",
            data: {
              id: data.mysqlid
            },
            dataType: "json",
            success: function (res) {
              console.log(res)
              if (res.status != "0") {
                layer.msg(res.message);
                return;
              }
              var url = res.data;
              if (url != "") {
                window.location.href = url
              }
            }
          });
        } if (data.ext == ".pdf") {
          $.ajax({
            type: "post",
            url: basepath + "/search/getPdfDirUri",
            data: {
              id: data.mysqlid
            },
            dataType: "json",
            success: function (res) {
              console.log(res)
              if (res.status != "0") {
                layer.msg(res.message);
                return;
              }
              var url = res.data;
              if (url != "") {
                window.location.href = url
              }
            }
          });
        } if (data.ext == ".docx") {
          $.ajax({
            type: "post",
            url: basepath + "/search/getDocDirUri",
            data: {
              id: data.mysqlid
            },
            dataType: "json",
            success: function (res) {
              console.log(res)
              if (res.status != "0") {
                layer.msg(res.message);
                return;
              }
              var url = res.data;
              if (url != "") {
                window.location.href = url
              }
            }
          });
        }


      }
    });
  })
}



//输入框失去焦点事件