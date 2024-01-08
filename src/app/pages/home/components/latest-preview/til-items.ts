export const tilItems: {
  title: string;
  description: string;
  author: string;
  likes: number;
  tags: string[];
}[] = [
  {
    title: 'Learned TypeScript Basics',
    description:
      "Today, I embarked on a journey to master TypeScript, a statically-typed superset of JavaScript. I delved into type annotations, gaining the power to define the shape of data and prevent common runtime errors. For instance, I learned to declare variable types like strings, numbers, and booleans, ensuring type safety throughout my code. Here's a simple example:\n\n```typescript\nconst name: string = 'John Doe';\nconst age: number = 30;\nconst isStudent: boolean = false;\n```\n\nBy explicitly specifying types, my code became more robust and easier to understand. Additionally, I explored interfaces to define custom data structures, making my applications more scalable and maintainable. TypeScript has opened up a world of possibilities, and I can't wait to use it in my future projects.\n",
    author: 'John Doe',
    likes: 15,
    tags: [
      'TypeScript',
      'JavaScript',
      'Frontend',
      'Web Development',
      'Programming',
      'Software Development',
    ],
  },
  {
    title: 'Mastered React Hooks',
    description:
      "Today, I deepened my knowledge of React Hooks, a powerful feature that brings functional components to life. I grasped the concept of 'useState,' which allows me to manage component state effortlessly. Here's an example of how I used it:\n\n```jsx\nimport React, { useState } from 'react';\n\nfunction Counter() {\n  const [count, setCount] = useState(0);\n\n  return (\n    <div>\n      <p>Count: {count}</p>\n      <button onClick={() => setCount(count + 1)}>Increment</button>\n    </div>\n  );\n}\n```\n\nI also harnessed the power of 'useEffect' to handle side effects, such as data fetching and DOM manipulation. React Hooks have transformed the way I build dynamic and interactive components, enhancing the overall user experience. With newfound knowledge, I'm ready to create more responsive and efficient applications.\n",
    author: 'Jane Smith',
    likes: 23,
    tags: ['React', 'JavaScript'],
  },
  {
    title: 'Explored CSS Grid Layout',
    description:
      "Today, I immersed myself in the world of CSS Grid Layout, a game-changer for web design. I learned how to create responsive and flexible layouts with ease. One of the standout features of CSS Grid is its ability to create two-dimensional grids, which simplify complex layouts. Here's a simple example of a grid:\n\n```css\n.grid-container {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  grid-gap: 20px;\n}\n```\n\nBy defining rows and columns, I gained fine-grained control over the placement of elements. CSS Grid's 'auto-fit' and 'auto-fill' properties made my designs adapt beautifully to various screen sizes. My web layouts have become more visually appealing and user-friendly thanks to this newfound skill.\n",
    author: 'Alex Johnson',
    likes: 12,
    tags: ['CSS'],
  },
  {
    title: 'Learned Basic Python',
    description:
      "Today, I embarked on my Python journey by mastering the fundamentals. I learned how to declare variables, manipulate strings, and work with numbers. Here's a simple Python script to print 'Hello, World!' to the console:\n\n```python\nprint('Hello, World!')\n```\n\nI also grasped the concept of conditionals and loops, enabling me to create more dynamic and interactive programs. Python's readability and simplicity have made it a joy to learn. With these essential skills under my belt, I'm excited to explore Python's vast ecosystem and tackle more complex projects in the future.\n",
    author: 'Emily Adams',
    likes: 10,
    tags: ['Python'],
  },
  {
    title: 'Discovering GraphQL',
    description:
      "Today, I delved into the world of GraphQL, a modern query language for fetching data in web applications. Unlike traditional RESTful APIs, GraphQL allows clients to request exactly the data they need, reducing over-fetching and under-fetching of data. Here's an example query:\n\n```graphql\nquery {\n  user(id: 1) {\n    name\n    email\n    posts {\n      title\n      content\n    }\n  }\n}\n```\n\nWith GraphQL, I can fetch related data in a single request, improving performance and reducing network overhead. This newfound knowledge has opened up exciting possibilities for building more efficient and data-driven web applications.\n",
    author: 'Michael Brown',
    likes: 18,
    tags: ['GraphQL'],
  },
  {
    title: 'UI/UX Principles',
    description:
      'Today, I dived into the realm of user interface (UI) and user experience (UX) design principles. I learned the importance of creating intuitive and user-friendly interfaces to enhance the overall user experience. I explored the principles of hierarchy, consistency, and visual feedback, which are crucial for effective UI/UX design.\n\nFor instance, I applied the concept of color psychology to choose the right color schemes that evoke desired emotions in users. I also learned how to conduct user research and usability testing to gather valuable insights for improving designs.\n\nThis knowledge will undoubtedly elevate the quality of my designs and make my applications more user-centered and engaging.\n',
    author: 'Sophia Lee',
    likes: 14,
    tags: ['UI/UX'],
  },
  {
    title: 'JavaScript Promises',
    description:
      "Today, I dived deep into JavaScript Promises, a powerful feature for handling asynchronous operations. I learned how to create and use Promises to manage asynchronous code effectively, ensuring smoother and more responsive applications.\n\nHere's a simple example of a Promise-based HTTP request using the 'fetch' API:\n\n```javascript\nfetch('https://api.example.com/data')\n  .then(response => response.json())\n  .then(data => console.log(data))\n  .catch(error => console.error(error));\n```\n\nI also explored 'async/await' syntax, which simplifies asynchronous code even further. With Promises in my toolkit, I'm better equipped to tackle complex asynchronous tasks in my projects.\n",
    author: 'David Wilson',
    likes: 9,
    tags: ['JavaScript'],
  },
  {
    title: 'Database Design Basics',
    description:
      'Today, I delved into the fundamentals of database design, a crucial aspect of building robust and scalable applications. I learned how to create well-structured databases, define relationships between tables, and optimize queries for efficient data retrieval.\n\nFor instance, I designed a simple relational database to store user information and their posts, ensuring data integrity and consistency. I also explored normalization techniques to minimize data redundancy.\n\nThis knowledge will empower me to create efficient and organized databases for my future projects, improving overall application performance.\n',
    author: 'Liam Carter',
    likes: 11,
    tags: ['Database'],
  },
  {
    title: 'Web Accessibility Standards',
    description:
      "Today, I dedicated my time to studying web accessibility standards, making my websites more inclusive and user-friendly for all individuals, including those with disabilities. I learned about the Web Content Accessibility Guidelines (WCAG) and how to apply them to my projects.\n\nI focused on providing alternative text for images, ensuring keyboard navigation, and using semantic HTML elements to enhance screen reader compatibility. I also ran accessibility audits to identify and fix potential issues.\n\nBy adhering to web accessibility standards, I'm committed to creating a more inclusive web environment that caters to a broader audience.\n",
    author: 'Olivia Davis',
    likes: 17,
    tags: ['Accessibility'],
  },
  {
    title: 'Version Control with Git',
    description:
      "Today, I mastered the art of version control using Git, a crucial skill for collaborating on software projects. I learned how to create and manage Git repositories, commit changes, and work with branches to organize development workflows.\n\nFor example, I created a feature branch to work on a new feature, keeping my main codebase clean and stable. I also explored collaborative features like pull requests and code reviews, enhancing team collaboration and code quality.\n\nWith Git in my toolkit, I'm well-prepared to work on collaborative software projects efficiently and with confidence.\n",
    author: 'Lucas Martinez',
    likes: 20,
    tags: ['Git'],
  },
];
