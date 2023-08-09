<template>
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="card">
                    <div class="card-header">Registration Form</div>
                    <div class="card-body">
                        <form @submit.prevent="handleSubmit">
                            <div class="form-group">
                                <label for="firstName">First Name</label>
                                <input type="text" v-model="firstName" class="form-control" required>
                            </div>
                            <div class="form-group">
                                <label for="lastName">Last Name</label>
                                <input type="text" v-model="lastName" class="form-control" required>
                            </div>
                            <div class="form-group">
                                <label for="email">Email</label>
                                <input type="email" v-model="email" class="form-control" required>
                            </div>
                            <div class="form-group">
                                <label for="password">Password</label>
                                <input type="password" v-model="password" class="form-control" required>
                            </div>
                            <button type="submit" class="btn btn-primary">Register</button>
                        </form>
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
            firstName: '',
            lastName: '',
            email: '',
            password: '',
        };
    },
    methods: {
        handleSubmit() {
            // Perform registration logic here, e.g., send data to a server
            console.log('Registration data:', {
                firstName: this.firstName,
                lastName: this.lastName,
                email: this.email,
                password: this.password,
            });
            // Clear form fields after submission
            this.firstName = '';
            this.lastName = '';
            this.email = '';
            this.password = '';
        },
    },
};
</script>


<style lang="scss" scoped>
.container {
    margin-top: 2rem;
    max-width: 30rem;
}

.card {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border: none;
}

.card-header {
    background-color: #f4f4f4;
    padding: 1rem;
    font-weight: bold;
}

.card-body {
    padding: 1.5rem;
}

.form-group {
    margin-bottom: 1.5rem;
}

label {
    font-weight: bold;
}

input[type="text"],
input[type="email"],
input[type="password"] {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
}

button.btn-primary {
    width: 100%;
    padding: 0.75rem 1rem;
    font-size: 1rem;
    background-color: #007bff;
    border: none;
    border-radius: 4px;
    color: #fff;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #0056b3;
    }

    &:disabled {
        background-color: #b7b7b7;
        cursor: not-allowed;
    }
}
</style>
