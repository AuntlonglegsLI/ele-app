<template>
  <div class="address">
    <Header :isLeft="true" :title="title" />
    <div class="city_search">
      <div class="search">
        <span class="city">
          {{city}}
          <i class="fa fa-angle-down"></i>
        </span>
        <i class="fa fa-search"></i>
        <input type="text" v-model="search_val" placeholder="写字楼/小区/学校" />
      </div>
      <Location :address="address" />
    </div>
    <div class="area">
      <!-- <ul class="area_list">
        <li v-for="(item,index) in areaList" :key="index">
          <h4>{{item.name}}</h4>
          <p>{{item.district}}{{item.address}}</p>
        </li>
      </ul>-->
      <ul class="area_list" v-for="(item,index) in areaList" :key="index">
        <li>
          <h4>{{item.name}}</h4>
          <p>{{item.district}}{{item.address}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header";
import Location from "../components/Location";
export default {
  name: "Address",
  components: {
    Header,
    Location
  },
  computed: {
    address() {
      return this.$store.getters.location.formattedAddress;
    }
    // city() {
    //   return (
    //     this.$store.getters.location.addressComponent.city ||
    //     this.$store.getters.location.addressComponent.province
    //   );
    // }
  },
  watch: {
    search_val() {
      this.searchPlace();
    }
  },
  data() {
    return {
      title: "选择收货地址",
      city: "", // 定位当前城市
      search_val: "",
      areaList: []
    };
  },
  beforeRouteEnter(to, from, next) {
    console.log(to.params);
    next(vm => {
      vm.city = to.params.city;
    });
  },
  methods: {
    searchPlace() {
      const self = this;
      // console.log(this.search_val)
      AMap.plugin("AMap.Autocomplete", function() {
        // 实例化Autocomplete
        var autoOptions = {
          //city 限定城市，默认全国
          city: self.city
        };
        var autoComplete = new AMap.Autocomplete(autoOptions);
        autoComplete.search(self.search_val, function(status, result) {
          // 搜索成功时，result即是对应的匹配数据
          console.log(result);
          self.areaList = result.tips;
        });
      });
    }
  }
};
</script>

<style scoped>
.address {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
  padding-top: 45px;
}
.city_search {
  background-color: #fff;
  padding: 10px 20px;
  color: #333;
}
.search {
  background-color: #eee;
  height: 40px;
  border-radius: 10px;
  box-sizing: border-box;
  line-height: 40px;
}
.search .city {
  padding: 0 10px;
}
.city i {
  margin-right: 10px;
}
.search input {
  margin-left: 5px;
  background-color: #eee;
  outline: none;
  border: none;
}
.area {
  margin-top: 16px;
  background-color: #fff;
}
.area li {
  border-bottom: 1px solid #eee;
  padding: 8px 16px;
  color: #aaa;
}

.area li h4 {
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
}
</style>