import Image from "next/image";


function Nurse({ name, imageSrc }) {
    return (
        <div class="bg-white">
            <Image src={imageSrc} alt={name} className="dark:invert mb-2"
                width={100} height={100} priority />
            <p>{name}</p>
        </div>
    );
}

export default function Profile() {
    return (
        <section className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6 text-center">Nurse Lists</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <Nurse name="Name York Surname 1" imageSrc="/img/doctor.png" />
            <Nurse name="Name mew Surname 2" imageSrc="/img/patient.png" />
            <Nurse name="Name poo Surname 3" imageSrc="/img/patient.png" />

            </div>
        </section>
    );
}
