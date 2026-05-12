import React from 'react';

function Avatar({ src, alt }) {
    return (
        <img
            src={src}
            alt={alt}
            style={{
                width: "150px",
                height: "150px",
                borderRadius: "50%",
                objectFit: "cover",
                marginBottom: "15px"
            }}
            onError={(e) => {
                e.target.src = "https://via.placeholder.com/150";
            }}
        />
    );
}

export default function Profile() {
    const dummyData = {
        name: "Sunkara Naga Sai Ram Vivek1",
        email: "s.nagasairamvivek@gmail.com",
        profilePicture: "frontend\src\public\gfytdngrbfed.jpg",
        bio: "Full Stack Developer | Tech Enthusiast | Open Source Contributor",
        location: "Hyderabad, India",
        website: "https://sunkaranagasairamvivek.dev",
        mobile_number: "+91 9876543210",
        socialLinks: {
            github: "https://github.com/sunkaranagasairamvivek",
            linkedin: "https://linkedin.com/in/sunkaranagasairamvivek",
            twitter: "https://twitter.com/sunkaranagasairamvivek"
        }
    };

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
                textAlign: "center"
            }}
        >
            <div>
                <h1>Profile Page</h1>

                <Avatar src={dummyData.profilePicture} alt="Profile" />

                <h2>{dummyData.name}</h2>
                <p>Email: {dummyData.email}</p>
                <p>Bio: {dummyData.bio}</p>
                <p>Location: {dummyData.location}</p>

                <p>
                    Website:{" "}
                    <a href={dummyData.website} target="_blank" rel="noopener noreferrer">
                        {dummyData.website}
                    </a>
                </p>

                <p>Mobile: {dummyData.mobile_number}</p>

                <div style={{ display: "flex", justifyContent: "center", gap: "15px" }}>
                    <a href={dummyData.socialLinks.github} target="_blank" rel="noopener noreferrer">
                        GitHub
                    </a>
                    <a href={dummyData.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                        LinkedIn
                    </a>
                    <a href={dummyData.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                        Twitter
                    </a>
                </div>
            </div>
        </div>
    );
}