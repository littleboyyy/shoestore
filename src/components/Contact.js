import React from 'react';
import { FaFacebook, FaGithub, FaGoogle, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';

function Contact() {
    return (
        <footer class="bg-light text-center text-white">

            <div class="container p-4 pb-0">

                <section class="mb-4">

                    <a
                        class="btn text-white btn-floating m-1"
                        style={{ backgroundColor: '#3b5998' }}
                        href="#!"
                        role="button"

                    >
                        <FaFacebook></FaFacebook>
                    </a>


                    <a
                        class="btn text-white btn-floating m-1"
                        style={{ backgroundColor: '#55acee' }}
                        href="#!"
                        role="button"
                    >
                        <FaTwitter></FaTwitter>
                    </a>


                    <a
                        class="btn text-white btn-floating m-1"
                        style={{ backgroundColor: '#ac2bac' }}
                        href="#!"
                        role="button"
                    >
                        <FaInstagram></FaInstagram>
                    </a>


                    <a
                        class="btn text-white btn-floating m-1"
                        style={{ backgroundColor: '#0082ca' }}
                        href="#!"
                        role="button"
                    >
                        <FaLinkedin></FaLinkedin>
                    </a>

                    <a
                        class="btn text-white btn-floating m-1"
                        style={{ backgroundColor: '#333333' }}
                        href="#!"
                        role="button"
                    >
                        <FaGithub></FaGithub>
                    </a>
                </section>

            </div>



            <div class="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                © 2022 Copyright:
                <a class="text-white" href="">ShoesStore.com</a>
            </div>

        </footer>
    )
}

export default Contact;