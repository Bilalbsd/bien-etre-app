import React from 'react'

function Apropos() {
    return (
        <div>
            <section className="bg-gray-100 py-20">
                <div className="container mx-auto">
                    <div className="flex flex-col md:flex-row items-center justify-center">
                        <div className="md:w-1/2 mb-6 md:mb-0">
                            <img src="/tranqulle.webp" alt="À propos" className="rounded-lg shadow-md" />
                        </div>
                        <div className="md:w-1/2 md:ml-12">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">À propos de notre application</h2>
                            <p className="text-lg mb-4">Notre application vise à promouvoir le bien-être des étudiants en leur fournissant des outils et des ressources pour gérer le stress, améliorer la concentration et trouver l'équilibre entre les études et la vie personnelle.</p>
                            <p className="text-lg mb-4">Nous croyons que chaque étudiant mérite de se sentir soutenu et épanoui dans son parcours académique, et notre mission est de faciliter ce voyage vers le bien-être.</p>
                        </div>
                    </div>
                </div>
            </section></div>
    )
}

export default Apropos