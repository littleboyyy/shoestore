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
                        href="https://www.facebook.com/"
                        role="button"
                        title='Facebook'
                        target="_blank"
                    >
                        <FaFacebook></FaFacebook>
                    </a>


                    <a
                        class="btn text-white btn-floating m-1"
                        style={{ backgroundColor: '#55acee' }}
                        href="https://twitter.com/"
                        role="button"
                        title='Twitter'
                        target="_blank"
                    >
                        <FaTwitter></FaTwitter>
                    </a>


                    <a
                        class="btn text-white btn-floating m-1"
                        style={{ backgroundColor: '#ac2bac' }}
                        href="https://www.instagram.com/"
                        role="button"
                        title='Instagram'
                        target="_blank"
                    >
                        <FaInstagram></FaInstagram>
                    </a>


                    <a
                        class="btn text-white btn-floating m-1"
                        style={{ backgroundColor: '#0082ca' }}
                        href="https://www.linkedin.com/"
                        role="button"
                        title='LinkedIn'
                        target="_blank"
                    >
                        <FaLinkedin></FaLinkedin>
                    </a>

                    <a
                        class="btn text-white btn-floating m-1"
                        style={{ backgroundColor: '#333333' }}
                        href="https://github.com/leduochoang2001"
                        role="button"
                        target="_blank"
                        title='Github'
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