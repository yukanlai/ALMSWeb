menu = {
  jsonData: "",

  hasAccordion: false,

  fetchMenu: function(){
    try{
      $.alms.block();
      var userToken = sessionStorage.getItem('token');

      $.ajax({
        type: 'Get',
        url: "https://localhost:5001/api/Menu/get/" + userToken,
        async: true,
        headers: {
          token: userToken
        },
        dataType: 'json',
        beforeSend: function(){
            $.alms.block();
        },
        success: function(data, status, xhr){
          menu.genMenuDom(data.Data);
            // console.log("apiData:", data, status, xhr);
        },
        error: function(jqXhr, textStatus, errorMessage){
            console.log("apiFail:", jqXhr, textStatus, errorMessage);
        },
        complete: function(){
            $.alms.unblock();
        }
      });

    }catch(err){
      $.alms.unblock();
      console.log("apiErr:", err);
    }
  },

  genMenuDom: function(arrOfObj){
    if(!arrOfObj.length){
      return;
    }

    var $rootUl = $('ul.nav');

    arrOfObj.forEach(function(item, index){
      if(item.Sort !== index){
        console.log("Error! submenu order error");
      }

      if(item.SubMenu !== null){
        console.log("Error! parentId error");
      }

      var newLi = document.createElement('LI');
      newLi.setAttribute('id', item.Id);
      var newA = document.createElement('A');
      var newI = document.createElement('I');
      newI.setAttribute('class', "fa " + item.Icon);
      var newP = document.createElement('P');
      newP.innerText = item.Name;

      // condition when menu is active
      if(index === 0){
        newLi.setAttribute('class', 'active');
      }

      if(Array.isArray(item.SubMenu)){
        newA.setAttribute('class', 'collapsed');
        newA.setAttribute('data-toggle', 'collapse');
        newA.setAttribute('data-target', '#' + item.Name);

        var subMenuDom = _genSubMenuDom(item.Id, item.Name, item.SubMenu);
      }else{
        newA.setAttribute('href', item.Url);
      }

      newA.appendChild(newI);
      newA.appendChild(newP);
      newLi.appendChild(newA);

      $rootUl.append(newLi);

      if(subMenuDom){
        $rootUl.append(subMenuDom);
      }

    });

    function _genSubMenuDom (parentId, parentName, arr){
      var rootDiv = document.createElement('DIV');
      rootDiv.setAttribute('id', parentName);
      rootDiv.setAttribute('class', 'collapse');

      arr.forEach(function(subItem, index){
        if(subItem.SubMenu){
          console.log("Error! has three layer subMenu");
        }

        if(subItem.Sort !== index){
          console.log("Error! submenu order error");
        }

        if(subItem.SubMenu !== parentId){
          console.log("Error! parentId error");
        }

        var newLi = document.createElement('LI');
        newLi.setAttribute('id', subItem.id);
        newLi.setAttribute('class', 'menu-item-collapse');
        var newA = document.createElement('A');
        newA.setAttribute('href', subItem.Url);
        var newI = document.createElement('I');
        newI.setAttribute('class', "fa " + subItem.Icon);
        var newP = document.createElement('P');
        newP.innerText = subItem.Name;
        
        newA.appendChild(newI);
        newA.appendChild(newP);
        newLi.appendChild(newA);

        rootDiv.appendChild(newLi);
      });
      
      return rootDiv;
    }

  }
}