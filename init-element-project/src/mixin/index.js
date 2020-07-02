
  import rangeDate from '@/components/rangeDate.vue';

export default {
    methods: {
        jumpTo(name) {
            this.$router.push({
                name
            })
        },
        showErrorMsg(message) {
            this.$message.error({
                showClose: true,
                message,
                duration: 2000
            });
        },
        async getData(options) {
            let {
                url,
                params
            } = options;
            let res = await this.axios({ url,
                data: {
                    ...params
                }
            })
            if (res.status === 500 || res.status === 404) {
                this.showErrorMsg(res.statusText);
                return;
            }
            if(res.code === 200) {
                return res;
            } else {
                this.showErrorMsg(res.msg);
                return;
            }
        }
    },
    components: {
        rangeDate
    }
}