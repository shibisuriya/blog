interface Project {
  title: string
  description: string
  href?: string
  imgSrc?: string
}

// The project's banner image's aspect ratio should be 800:691.

const projectsData: Project[] = [
  {
    title: 'Dir Bunny',
    description: `dir-bunny is a CLI tool that lets you hop back and forth between your current working directory and the directories you were in before.`,
    imgSrc: '/static/images/projects/dir-bunny.webp',
    href: 'https://github.com/shibisuriya/dir-bunny',
  },
  {
    title: 'Classic Slither.io',
    description: `Experience Slither.io gameplay on a Nokia 6110-style snake game, powered by React and WebRTC. Play against bots or your friends.`,
    imgSrc: '/static/gifs/slither-io-gameplay.gif',
    href: 'https://github.com/shibisuriya/classic-slither.io',
  },
  {
    title: 'Indian E-commerce Product Scraper',
    description: `This project allows you to scrape products from various Indian e-commerce websites. It consists of multiple Python scripts, each dedicated to scraping a specific website.`,
    imgSrc: '/static/images/time-machine.jpg',
    href: 'https://github.com/shibisuriya/indian-e-commerce-scaper',
  },
]

export default projectsData
