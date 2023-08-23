<template>
    <nav class="navbar">
        <div class="container">
            <div class="navbar-brand">
                <router-link class="link" to="/">
                    <img src="@/assets/imgs/logo.jpg" alt="Logo" class="logo">
                </router-link>
                <div class="user-name">
                    hello {{ loggedInUser?.fullname }}
                </div>
            </div>
            <div class="search-form">
                <input type="text" placeholder="Search">
            </div>
            <i class="fa fa-bars" @click="showMenu()"></i>
            <div class="navbar-collapse" :class="this.showMobileMenu ? 'open-menu' : 'closed-menu'">
                <ul class="navbar-nav">
                    <router-link class="link" to="/">Home</router-link>
                    <router-link class="link" to="/activity">Activities</router-link>
                    <router-link class="link" to="/about">About</router-link>
                    <router-link class="link" to="/dashboard">Dashboard</router-link>
                    <router-link v-if="!loggedInUser" class="link" to="/join">Join us</router-link>
                    <span v-if="loggedInUser" class="user-profile-photo">
                        <router-link class="link" to="/UserPage"></router-link>
                        <div class="online-dot">
                        </div>
                        <span v-if="userImg">
                            <img :src="userImg" :alt="userImgAlt" />
                        </span>
                        <span v-else class="img-user-alt"> {{ userImgAlt }}</span>
                    </span>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>

export default {
    name: 'AppHeader',
    data() {
        return {

        };
    },
    methods: {
        showMenu() {
            this.showMobileMenu = !this.showMobileMenu;
        },
    },
    computed: {
        loggedInUser() {
            console.log("🚀 ~ file: AppHeader.vue:56 ~ loggedInUser ~ this.$store.getters.loggedInUser:", this.$store.getters.loggedInUser)
            return this.$store.getters.loggedInUser
        }
    },
}
</script>

<style lang="scss" scoped>
.navbar {

    font-family: Arial,
        Helvetica,
        sans-serif;
    font-size: 1.2rem;
    background-color: #007bff;
    color: #fff;
    padding: 1rem 0;
    grid-column: 1/-1;
    height: fit-content;


    & .container {
        margin-inline: auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        max-width: 1500px;

        @media (max-width:800px) {
            flex-direction: column;
        }

        & .logo {
            height: 50px;
            width: auto;
            border-radius: 20rem;

            @media (max-width:800px) {
                position: absolute;
                left: 1rem;
            }
        }

        & ul.navbar-nav {
            list-style: none;
            display: flex;
            gap: 1rem;
            margin: 0;
            cursor: pointer;

            @media (max-width:800px) {
                flex-direction: column;
                gap: 0;

                & .link {
                    border: none !important;
                    margin-block-start: 1rem;
                    width: 90vw;
                    text-align: center;
                    box-shadow: 0 1px 2px 0 #1667be;
                }
            }

            & .link {
                color: #fff;
                text-decoration: none;
                transition: color 0.3s ease;
                border: 1px solid #fff;
                border-radius: 5px;
                padding: 5px;

                &:hover {
                    color: #acacac;
                    box-shadow: 3px 3px 2px 1px #5c578b;
                }
            }
        }

        .fa {
            display: none;

            @media (max-width:800px) {
                display: block;
                position: absolute;
                right: 2rem;
                top: 1.5rem;
                font-size: xx-large;
            }
        }

        @media (max-width: 800px) {
            & .open-menu {
                opacity: 1;
                height: 225px;
            }

            & .closed-menu {
                opacity: 0;
                height: 0;
                padding: 0;
            }
        }

        .search-form {
            display: flex;
            align-items: center;
        }

        .search-form input {
            padding: 0.25rem 0.5rem;
            border: none;
            border-radius: 4px;
            height: 2rem;

            @media (max-width:760px) {
                margin-block-start: 10px;
            }
        }
    }

    & .user-profile-photo {
        & .online-dot {
            position: absolute;
            bottom: -2px;
            right: -2px;
            width: 12px;
            height: 12px;
            z-index: 1;
            border-radius: 50%;


            background-color: #c2c2c2;

            border-width: 2px;
            border-color: #fff;
            border-style: solid;

            .online-dot-helper {
                z-index: 2;

                background-color: #c2c2c2;
                border-width: 2px;
                border-width: 2px;
                width: 8px;
                height: 8px;
                border-radius: 50%;
                border-style: solid;

            }
        }

        position: relative;
        background-color: #A23F6E;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;

        img {
            position: relative;
            top: 4px;
            width: 34px;
            height: 33px;
            border-radius: 50%;

        }

        .img-user-alt {
            position: relative;
            top: 1px;
            color: #fff;
        }
    }
}
</style>

