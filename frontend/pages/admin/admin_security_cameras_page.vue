<template>
    <v-row>
        <v-col :cols="12" :md="6" :sm="12">
            <video id="webcam" autoplay playsinline width="480" height="280" controls></video>
            <canvas id="canvas" class="d-none"></canvas>
        </v-col>


        <v-col cols="12" sm="12" md="6">
            <v-card flat outlined height="280" :img="snap">
                processed images will show up here
            </v-card>
        </v-col>

        <v-col :cols="12">
            <v-chip
                class="ma-2"
                close
                color="teal"
                text-color="white"
            >
                Snaps Number: {{ snapsNumber }}
            </v-chip>
        </v-col>
    </v-row>
</template>

<script>
    import Webcam from 'webcam-easy';
    import io from 'socket.io-client';

    export default {
        name: "admin_security_cameras_page",
        layout: 'dashboard',
        async asyncData({$axios}) {
            return await $axios.get('admin/employees-features')
                .then(response => {
                    return {employees: response.data.employees}
                })
        },
        mounted() {
            const webcamElement = document.getElementById('webcam');
            const canvasElement = document.getElementById('canvas');

            this.webcam = new Webcam(webcamElement, 'user', canvasElement);

            this.webcam.start()
                .then(result => {
                })
                .catch(err => {
                });

            this.socketConnection = io('127.0.0.1:4300')

            this.snapInterval = setInterval(() => {
                const snap = this.webcam.snap();
                // this.snap = snap;

                this.socketConnection.emit('process_snap', {
                    vectors: this.employees,
                    snap: snap.replace('data:image/png;base64,', ''),
                })

                this.snapsNumber++;

            }, 1000)

        },
        beforeRouteLeave(to, from, next) {
            // this.webcam.stop()
            clearInterval(this.snapInterval);

            return next();
        },

        data: () => ({
            snapInterval: '',
            webcam: null,
            snap: null,
            snapsNumber: 0,
            socketConnection: null
        })
    }
</script>

<style scoped>
    #container {
        margin: 0 auto;
        width: 500px;
        height: 375px;
        border: 10px #333 solid;
    }

    #videoElement {
        width: 500px;
        height: 375px;
        background-color: #666;
    }
</style>
