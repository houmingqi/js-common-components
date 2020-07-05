// 一：等宽瀑布流
// 1. JS计算列数  首先设置列宽度，然后计算能够展示的列数。向每一列中添加图片。

<script>
// 计算图片列数
function getColNumber() {
  let clientWidth = this.$refs.waterfall.clientWidth;
  this.colNumbers = Math.floor(clientWidth / this.colWidth);
}
// 读取图片并把图片插入到每一列中
function loadImage() {
  this.getColNumber();
  for (let i = 0; i < 17; i++) {
    let colIndex = i % this.colNumbers;
    let url = require("url的路径");
    if (this.imgList[colIndex]) {
      this.imgList[colIndex].push(url);
    } else {
      this.$set(this.imgList, colIndex, [url]);
    }
  }
}

// 缺点：每列末尾不友好
</script>

// 2. 利用绝对定位： 首先设置列宽度，然后计算能够展示的列数。
// 把图片设置为绝对定位，然后计算出每个图片的top，left值。
// 先把第一行图片排好，top 为 0，left 为 列的索引*列宽。
// 从第二行开始，每张图片都放到最短的一列下面。然后增加此列高度，此时列的高度发生变化，下张图片又会寻找其他最短的列。以此持续计算下去。

<script>
function loadImage() {
  this.getColNumber();
  for (let i = 0; i < 17; i++) {
    let image = new Image();
    let url = require("url路径");
    image.src = url;
    image.load = () => {
      this.render({
        index: i,
        url: url,
        ratio: image.width / image.height
      });
    };
  }
}
function render(imgInfo) {
    let colIndex = imgInfo.index%this.colNumbers;
    imgInfo.left = colIndex*this.colWidth;
    if(imgInfo.index<this.colNumbers) {
        imgInfo.top=0;
        // 记录每列的高度
        this.colHeight[colIndex] =this.colWidth/imgInfo.ratio;
    }else {
        // 获取高度的最小值和索引
        let minHeight = Math.min.apply(null,this.colHeight);
        let minIndex=this.colHeight.indexOf(minHeight);
        // top就位上面的图片的高度，left算法相同
        imgInfo.top=minHeight;
        imgInfo.left=minIndex*this.colWidth;
        // 总高度要加一下
        this.colHeight[minIndex]+=this.colWidth/imgInfo.ratio
    }
    this.imgList.push(imgInfo);
}
// 缺点：打乱了图片的顺序
</script>

// 二：登高瀑布流
// flex布局  首先给图片一个固定高度，然后利用flex-grow的比例分配的特性  给图片设定object-fit属性让其保持比例充满容器
<template>
    <div class="waterfall-height-css">
        <div class="image-box" v-for="img in imgList" :key="img.url">
            <img :src="img.url" alt="">
        </div>
    </div>
</template>
<style lang="scss" scoped>
.waterfall-height-css {
    display: flex;
    flex-wrap: wrap;
    .image-box {
        flex-grow: 1;
    }
    img {
        display: block;
        min-width: 100%;
        height: 200px;
        object-fit: cover;
    }
    &:after {
        content: '';
        display: block;
        flex-grow: 999999;
    }
}
// 缺点：会损失图片的一部分可见区域（最后一行图片可能有问题）
</style>
