"use client";
import Image from "next/image";
export default function AboutSection() {
  return (
    <>
      <style jsx>{`
        body {
          margin: 0;
          padding: 0;
        }

        .title img {
          width: 100%;
          display: block;
          margin: 40px auto;
        }

        .container {
          display: flex;
          justify-content: center;
          gap: 40px;
          padding: 40px;
        }

        .about-box img {
          width: 100%;
        }

        .sidebar {
          display: flex;
          flex-direction: column;
          gap: 30px;
        }

        .card {
          text-align: center;
          cursor: pointer;
          transition: 0.2s;
        }

        .card:hover {
          transform: scale(1.05);
        }

        .card-icon img {
          width: 160px;
        }
      `}</style>

      <div className="background bg-black">
        <div className="title">
          <Image src="/home/title.webp" alt="Hackfest Title"  width={1920} height={1080} ></Image>
        </div>

        <div className="container">
          <div className="about-box">
            <Image src="/home/about.webp" alt="About Hackfest"  width={2200} height={1300} ></Image>
          </div>

          <div className="sidebar">
            <div className="card">
              <div className="card-icon">
                <Image src="/home/guidebook.webp" alt="Guidebook"  width={400} height={400} ></Image>
              </div>
            </div>

            <div className="card">
              <div className="card-icon">
                <Image src="/home/register.webp" alt="Register"  width={400} height={400} ></Image>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
