import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Github, Linkedin, Instagram } from "lucide-react";
import './index.css';

const projects = [
  // {
  //   title: "Smart Home Dashboard",
  //   description: "IoT dashboard built with MQTT, React & Tailwind.",
  //   link: "https://github.com/yourname/smarthome-dashboard",
  //   image: "https://source.unsplash.com/random/800x600?smart-home",
  // },
  // {
  //   title: "Algorithm Visualizer",
  //   description: "Interactive DSA visualizations using React + D3.",
  //   link: "https://github.com/yourname/algovis",
  //   image: "https://source.unsplash.com/random/800x600?algorithm",
  // },
  // {
  //   title: "Portfolio Website",
  //   description: "The site you’re looking at right now — built with React & Tailwind.",
  //   link: "https://github.com/yourname/portfolio",
  //   image: "https://source.unsplash.com/random/800x600?code",
  // },
];

export default function App() {
  return (
    <div className="min-h-screen bg-[#FAFAF7] text-gray-800 font-sans">
      {/* NAVBAR */}
      <header className="sticky top-0 z-10 bg-[#FAFAF7]/70 backdrop-blur shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between py-4 px-6">
          <h1 className="text-2xl text-500 font-bold tracking-tight">Izzul<span className="text-primary">.</span></h1>
          <nav className="space-x-6 text-sm font-medium">
            <a href="#about" className="hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/40 rounded">About</a>
            <a href="#projects" className="hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/40 rounded">Projects</a>
            <a href="#contact" className="hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/40 rounded">Contact</a>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-6 py-24 flex flex-col md:flex-row items-center gap-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-1"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
            Hi, I'm <span className="text-primary">Izzul</span> 👋
          </h2>
          <p className="text-lg md:text-xl mb-8 max-w-prose">
            A software engineer who loves building delightful web experiences.
          </p>
          <Button asChild size="lg" className="text-white">
            <a href="#projects">Check out my work</a>
          </Button>
        </motion.div>
        <motion.img
          src="img/catto.jpg"
          alt="Dev"
          className="w-40 h-40 md:w-56 md:h-56 rounded-full object-cover ring-4 ring-primary/20"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        />
      </section>

      {/* ABOUT */}
      <section id="about" className="max-w-4xl mx-auto px-6 py-20">
        <h3 className="text-3xl font-bold mb-6 text-center">About Me</h3>
        <p className="text-lg leading-relaxed text-center">
          I'm a second‑year Software Engineering student at Singapore Institute of Technology with a passion for
          full‑stack development. When I'm not coding, you’ll find me sleeping or working on myself.
        </p>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="w-full bg-white py-20">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h3 className="text-4xl font-bold mb-4">Projects</h3>
            <p className="text-lg text-gray-600">This section is still under construction 🛠️</p>
            <p className="text-sm text-gray-500 mt-2">Come back soon to see cool things I’m working on.</p>
          </div>
        {/* <div className="max-w-6xl mx-auto px-6">
          <h3 className="text-3xl font-semibold mb-12 text-center">Projects</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, idx) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
              >
                <Card className="rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                  <img src={project.image} alt={project.title} className="w-full h-40 object-cover" />
                  <CardContent className="p-6 flex flex-col gap-4">
                    <h4 className="text-xl font-bold">{project.title}</h4>
                    <p className="text-sm text-gray-600 flex-1">{project.description}</p>
                    <Button variant="outline" asChild>
                      <a href={project.link} target="_blank" rel="noopener noreferrer">
                        View Repo
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div> */
        /* </div> */}
      </section>

      {/* CONTACT */}
      <section id="contact" className="max-w-3xl mx-auto px-6 py-20 text-center">
        <h3 className="text-3xl font-bold mb-6">Get In Touch</h3>
        <p className="text-lg mb-8">
          Have an exciting project or just want to say hi? My inbox is always open.
        </p>
        <div className="flex justify-center gap-6">
          <Button size="icon" variant="outline" asChild>
            <a href="mailto:izzulhbz@gmail.com" aria-label="Email">
              <Mail className="w-5 h-5" />
            </a>
          </Button>
          <Button size="icon" variant="outline" asChild>
            <a href="https://github.com/izzulhbz" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Github className="w-5 h-5" />
            </a>
          </Button>
          <Button size="icon" variant="outline" asChild>
            <a href="https://linkedin.com/in/izzulhbz" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin className="w-5 h-5" />
            </a>
          </Button>
          <Button size="icon" variant="outline" asChild>
            <a href="https://instagram.com/izzulhbz" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <Instagram className="w-5 h-5" />
            </a>
          </Button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} izzulhbz — Built with ♥ and 💧.
      </footer>
    </div>
  );
}
