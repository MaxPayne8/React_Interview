////REACT NOTES------------------------------>

// useState ------------------------->
// Purpose: Manages local state in a functional component.

// How It Works: useState returns two values: the current state and a function to update the state.
// The component will re-render whenever the state is updated.

// useEffect ---------------------------->
// Purpose: Runs side effects in your components. It can be used for fetching data, directly
// interacting with the DOM, setting up subscriptions, or cleaning up resources.

// How It Works: The useEffect hook runs after the render and can optionally depend on specific state values (dependencies).

// useEffect(() => {
//   // Runs when the component mounts or updates based on dependencies
//   console.log("Component mounted or updated");

//   return () => {
//   Cleanup when the component unmounts or dependencies change, clear Interval , clear Timeout ,
//   removeEventListerner resize
//     console.log("Cleanup effect");

//   };
// }, [dependency]); // Only runs if dependency changes

// useEffect(() => {
//   const handleResize = () => console.log("Window resized");

//   window.addEventListener("resize", handleResize);

//   // Cleanup: remove the event listener when component unmounts
//   return () => {
//     window.removeEventListener("resize", handleResize);
//     console.log("Event listener removed");
//   };
// }, []); // Only runs on mount and cleanup on unmount

// useRef-------------------------------------------------->
// Purpose: useRef creates a mutable object that persists across renders.
// It’s commonly used to reference DOM elements or to hold values that don’t trigger a re-render.

// How It Works: It provides a .current property, where you can store the reference.

// const inputRef = useRef(null);

// useEffect(() => {
//   inputRef.current.focus(); // Focus the input field on mount
// }, []);

// return <input ref={inputRef} />;

// useContext ------------------------------------------->
// Purpose: Allows you to share data (state, functions, etc.) between components without passing props down
// manually at every level (prop drilling).

// How It Works: It consumes the value provided by a context created with React.createContext.
//See example in util folder in contextFile(Task-Context)

// useCallback---------------------------------------->
// Purpose: Returns a memoized version of a callback function that only changes if one of its
// dependencies changes. Helps prevent unnecessary re-renders by preventing the recreation of functions.

// How It Works: It returns the same function reference unless the dependencies change

// const handleClick = useCallback(() => {
//   console.log("Button clicked");
// }, []); // [] means the function will never change

// return <button onClick={handleClick}>Click me</button>;

// Useful when passing functions to child components to avoid unnecessary renders.

///More detailed example-------------------->

// import React, { useState, useCallback } from "react";

// Child component
// const ChildComponent = React.memo(({ onButtonClick }) => {
//   console.log("ChildComponent rendered");

//   return <button onClick={onButtonClick}>Click Me</button>;
// });

// // Parent component
// const ParentComponent = () => {
//   const [count, setCount] = useState(0);

//   // useCallback ensures that the function reference is stable between renders
//   const handleButtonClick = useCallback(() => {
//     console.log("Button clicked");
//   }, []); // Empty dependency array means the function does not change

//   return (
//     <div>
//       <ChildComponent onButtonClick={handleButtonClick} />
//       <button onClick={() => setCount(count + 1)}>
//         Increment Count ({count})
//       </button>
//     </div>
//   );
// };

// export default ParentComponent;

// Explanation:

// Why This Optimization Matters:-------------------->
// When you click the "Increment Count" button, ParentComponent re-renders because the count state changes.

// Without useCallback, the handleButtonClick function reference would be recreated on every render,
// and React.memo would not be able to prevent ChildComponent from re-rendering.

// With useCallback, the handleButtonClick function remains the same between renders,
// so ChildComponent does not re-render unless some other prop changes, saving unnecessary rendering cycles.

// Since functions in JavaScript are reference types, even if the implementation of
// the function remains the same, a new reference would be created.(if we dont use useCallback)
// This means the onButtonClick prop passed to ChildComponent would have a new reference every time,
// causing React.memo to think the prop has changed and forcing ChildComponent to re-render.

// useCallback Hook:

// useCallback is used to memoize the handleButtonClick function. This means handleButtonClick will
// only be recreated if its dependencies change. Since we pass an empty array ([]) as dependencies,
//the function will be created once and reused across renders.
// This prevents handleButtonClick from being a new instance on every render.

// React.memo:

// ChildComponent is wrapped in React.memo, which performs a shallow comparison of its props.
// If the props don't change, the component doesn't re-render.
// Since handleButtonClick remains the same across renders (thanks to useCallback),
// ChildComponent doesn't re-render unless its other props change.

// Rendering Optimization:

// When the parent component (ParentComponent) re-renders (e.g., when the count state changes),
// ChildComponent doesn’t re-render because its props haven’t changed.
// Without useCallback, handleButtonClick would be a new function on every render,
// causing ChildComponent to re-render even if handleButtonClick is effectively the same.
// This approach helps in optimizing performance by avoiding unnecessary renders,
// especially in cases where child components rely on stable references for props.

// useMemo------------------------------------------------>
// Purpose: Returns a memoized value. Useful for optimizing expensive calculations by recalculating the
// value only when its dependencies change.

// How It Works: Only recomputes the value if the dependencies change.

// const expensiveCalculation = useMemo(() => {
//   return someHeavyFunction(data);
// }, [data]);  // Recompute only if 'data' changes and not when some other state changes or props making the page laggg..

// return <div>{expensiveCalculation}</div>;

// Ideal for performance optimization, avoiding unnecessary computations on every render.

// useReducer --------------------------------------------->(looks like redux , will come back here while resvising redux)

// Purpose: Manages complex state logic in functional components.
// It’s an alternative to useState and is ideal for managing state transitions (e.g., based on action types).

// How It Works: useReducer takes a reducer function and an initial state,
// returning the current state and a dispatch function to trigger state changes.

// const initialState = { count: 0 };

// function reducer(state, action) {
//   switch (action.type) {
//     case 'increment':
//       return { count: state.count + 1 };
//     case 'decrement':
//       return { count: state.count - 1 };
//     default:
//       return state;
//   }
// }

// const [state, dispatch] = useReducer(reducer, initialState);

// return (
//   <div>
//     <p>{state.count}</p>
//     <button onClick={() => dispatch({ type: 'increment' })}>+</button>
//     <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
//   </div>
// );

// React.memo ------------------------------------->

// Purpose: Optimizes functional components by memoizing the component.
//It prevents unnecessary re-renders if the component’s props haven’t changed.

// How It Works: React.memo wraps a component and performs a shallow comparison of props.
//If the props haven’t changed, the component is not re-rendered.

// Example:

// const MyComponent = React.memo(({ value }) => {
//   console.log("Rendered!");
//   return <div>{value}</div>;
// });

// useParams (React Router)----------------------------------------->
// Purpose: Access route parameters (dynamic parts of the URL)
// in components using React Router.

// How It Works: It returns an object of key-value pairs
// corresponding to the dynamic URL segments.

// import { useParams } from 'react-router-dom';

// function User() {
//   const { id } = useParams();  // Access the 'id' parameter from the URL
//   return <div>User ID: {id}</div>;
// }

// useLayoutEffect -------------------------------------->
// Purpose: Similar to useEffect, but it fires synchronously after all DOM mutations.
// Use this when you need to measure or modify the DOM right after a change.

// How It Works: Runs synchronously after DOM changes but before the browser paints.

// Example:

// useLayoutEffect(() => {
//   Runs synchronously after DOM updates but before the browser paints while useEffect runs asynchronosly after
// the DOM updates and the browser paints, ie By the time useEffect executes, the page is already visible to the user.
//   console.log("DOM updated");
// }, []);

// Side Effects: Actions that occur outside of a function’s scope or impact the external environment.
// Common examples include data fetching, DOM manipulation, subscriptions, timers, and local storage interactions.

// In React: Managed using useEffect or useLayoutEffect hooks in functional components, or
// lifecycle methods in class components. These hooks ensure that side effects are handled
// correctly within the component lifecycle.

// Custom Hook-------------------------------------------->
// Custom hooks in React allow you to encapsulate and reuse logic across multiple components.
// They enable you to extract and share stateful logic and side effects without changing the component hierarchy.
// Custom hooks are a powerful feature in React for organizing and managing complex logic in a clean and reusable way.

// See custom form hook example for more details..........

// Higher-Order Components (HOCs) in React are a pattern for reusing component logic.------------------->
// A Higher-Order Component is a function that takes a component and returns a new component
// with additional props or behavior.
// It's a way to abstract and reuse component logic without modifying the original component.

// See example with HOC(here we abstract the logic of auth and only show the dashboard when the user is authenticated
// and then pass the props to it..)
// and this below example(in the below example we add additional prop to button in hoc)-->

// import React from "react";

// // Simple Button component
// const Button = ({ label, color }) => {
//   return <button style={{ backgroundColor: color }}>{label}</button>;
// };

// // HOC to add extra props
// const withExtraProps = (WrappedComponent) => {
//   return (props) => {
//     // Add additional prop "color" with default value
//     const additionalProps = { color: "blue" };

//     // Return wrapped component with combined props
//     return <WrappedComponent {...props} {...additionalProps} />;
//   };
// };

// // Wrap Button component with HOC
// const EnhancedButton = withExtraProps(React.memo(Button));

// // Usage in a parent component
// const App = () => {
//   return (
//     <div>
//       <EnhancedButton label="Click Me!" />
//     </div>
//   );
// };

// export default App;

//LAZY LOADING ------------------------------------>

// In React, Suspense and lazy are used to implement lazy loading, which helps improve performance by
// loading components only when they're needed. This is particularly useful for large components
// that are not immediately required, such as those that appear after some interaction.

// 1. React.lazy() for Lazy Loading
// The React.lazy() function allows you to dynamically load a component only when it is needed.
// You pass a function that calls import() for the component, and React will load it asynchronously when it is rendered.

// 2. Suspense for Handling the Loading State
// While the component is being loaded asynchronously, React needs to know what to render during that waiting period.
// This is where the Suspense component comes in. You can use it to show a loading spinner, text, or some other UI
// until the lazy-loaded component is ready.

// HeavyComponent.js
// import React from 'react';

// const HeavyComponent = () => {
//   return <div>This is a heavy component loaded lazily!</div>;
// };

// export default HeavyComponent;

// import React, { Suspense } from 'react';

// // Lazy load the HeavyComponent
// const HeavyComponent = React.lazy(() => import('./HeavyComponent'));

// const App = () => {
//   return (
//     <div>
//       <h1>React Suspense and Lazy Loading Example</h1>

//       {/* Suspense handles the loading fallback */}
//       <Suspense fallback={<div>Loading...</div>}>
//         {/* The component will load lazily */}
//         <HeavyComponent />
//       </Suspense>
//     </div>
//   );
// };

// export default App;

//Life cycle methods---------------------------->

// In React, lifecycle methods allow you to hook into specific phases of a component's
// existence: mounting, updating, and unmounting. These lifecycle methods are mainly available in
// class components. However, with the introduction of React Hooks, functional components can now
// replicate lifecycle behavior using hooks like useEffect().

// Lifecycle Methods in Class Components
// React class components provide the following lifecycle methods:

// 1. Mounting Phase
// These methods are called when a component is being initialized and inserted into the DOM.

// constructor(props): Called before the component is mounted. It’s used for initializing state or binding event handlers.

// componentDidMount(): Invoked immediately after the component is mounted into the DOM.
// This is where you should perform side effects like data fetching or subscribing to external data sources.

// 2. Updating Phase
// These methods are called when the component's props or state change.

// shouldComponentUpdate(nextProps, nextState): Determines whether the component should re-render
// based on changes in props or state. This can be used for performance optimization by
// preventing unnecessary renders. It returns true by default.

// componentDidUpdate(prevProps, prevState): Called after the component has re-rendered due
// to changes in props or state. You can use this method for side effects like making
// network requests or interacting with the DOM.

// static getDerivedStateFromProps(nextProps, prevState): A rare lifecycle method
// that’s invoked right before rendering. It allows the component to update its
// state in response to prop changes. It’s static and doesn’t have access to the component’s instance (i.e., this).

// 3. Unmounting Phase
// This method is called when the component is about to be removed from the DOM.

// componentWillUnmount(): Invoked just before the component is unmounted and destroyed.
// It’s used for cleaning up (e.g., canceling network requests, removing event listeners, or invalidating timers).

// 4. Error Handling Phase
// These methods are used to catch errors in rendering or lifecycle methods.

// componentDidCatch(error, info): Called when there’s an error during rendering or in a
// lifecycle method. It can be used for error logging or showing fallback UI.

//Pure Components --------------------------------------->

// A Pure Component in React is a class component that automatically implements a shallow comparison
// of props and state to decide whether the component should re-render. If the new props or state are the same
// as the previous ones (based on a shallow comparison), the component skips re-rendering, which can improve performance.

// In contrast to regular class components that re-render whenever their parent renders or their state changes,
// Pure Components prevent unnecessary re-renders when the data hasn't changed.

// In functional components we use React.memo() for Pure Compoenets behaviour

// Virtual DOM (VDOM)---------------------------------->

// The Virtual DOM is a lightweight in-memory representation of the actual DOM.
// React uses this Virtual DOM to track changes in the component tree and update only the necessary parts of the real DOM.

// Key Points:

// Virtual DOM is a JavaScript object that mimics the structure of the real DOM but without the actual
// DOM manipulation overhead.

// When a React component's state or props change, React first updates the Virtual DOM rather than
// immediately interacting with the real DOM (which can be slow).

// React then compares the Virtual DOM with a previous version of it (this is where reconciliation comes in),
// determines the differences, and updates only the changed parts in the real DOM.

// Benefits:

// Efficiency: Manipulating the DOM directly is slow. By using the Virtual DOM, React can batch DOM updates
// and minimize the number of interactions with the real DOM.

// Declarative UI: Developers only need to declare how the UI should look, and React takes care
// of optimizing the updates.

// Reconciliation ----------------------------------------->
// Reconciliation is the process React uses to compare the old Virtual DOM with the new
// Virtual DOM and update the real DOM accordingly. This involves a diffing algorithm that
// efficiently figures out which parts of the DOM need to be updated.

// Key Steps:
// Render: React re-renders components into the Virtual DOM when state or props change.
// Diffing Algorithm: React compares the old Virtual DOM with the new Virtual DOM to figure out what changed.
// Update Real DOM: React applies the minimal set of changes to the real DOM to reflect the updates.

// React Fiber---------------------------------------->

// React Fiber is the underlying architecture introduced in React 16. It is a complete rewrite of React’s
// rendering engine aimed at improving React's performance,
// especially for large applications and animations.

// Key Features:

// Incremental rendering: Fiber allows React to split rendering work into chunks and
// pause rendering tasks to prioritize more important updates (like user interactions).
// This makes React more responsive for complex applications.

// Prioritization: Fiber allows React to prioritize tasks based on urgency (e.g., user input vs. background updates).
// React can interrupt low-priority tasks to handle more critical tasks first.

// Concurrency: Fiber enables concurrent rendering, where React can work on multiple tasks simultaneously
// and interrupt rendering when needed. This improves the user experience by avoiding UI freezes.

//Loading Strategies ---(Async , defer.............)------------------------>

// 1. async (Asynchronous Loading)

// The async attribute is used with <script> tags to load JavaScript files asynchronously
// without blocking the HTML parsing.

// How it works: When a script tag with async is encountered, the script is fetched asynchronously
// while the browser continues parsing the HTML. Once the script is downloaded, it is executed immediately.

// Use case: async is typically used for scripts that do not depend on other scripts or the DOM being
// fully loaded (e.g., analytics scripts, non-critical JavaScript).

// <script src="script.js" async></script>

// Pros:
// HTML parsing and script downloading happen simultaneously.
// Non-blocking.

// Cons:
// Scripts are executed as soon as they are downloaded, which could interrupt the flow of other resources or scripts.

// 2) defer (Deferred Loading)
// The defer attribute is also used with <script> tags, but it delays the execution of the script
// until the HTML document has been fully parsed.

// How it works: The browser downloads the script asynchronously but executes it only after the entire HTML has been parsed.
// Use case: Use defer for scripts that need access to the full DOM or are dependent on other scripts.
// It's ideal for JavaScript that modifies or interacts with the DOM after page load.

// <script src="script.js" defer></script>

// Pros:
// HTML parsing and script downloading happen simultaneously.
// The script is executed in order (if there are multiple deferred scripts), after the document is fully parsed.
// Non-blocking.

// Cons:
// The script will not execute until after the document parsing is finished, which may delay script
// execution slightly compared to async.

// 3)preload (Resource Preloading)
// The <link rel="preload"> directive allows you to preload resources (like fonts, CSS, images, or JavaScript files)
// that will be needed soon. Preloading hints to the browser that the resource should be fetched earlier than usual but
// used later.

// How it works: Resources are fetched as soon as possible and stored in the cache, ready to be used when needed.
// Use case: Preload critical resources that are needed for rendering above-the-fold content, like fonts or CSS.

// <link rel="preload" href="styles.css" as="style">
// Pros:
// Ensures critical resources are downloaded early to avoid render-blocking.
// Can reduce time-to-first-paint and improve perceived performance.

// Cons:
// Incorrect use of preload can lead to overfetching and increased bandwidth usage if resources are not needed immediately.

//4) prefetch
// For resources likely needed in the near future (e.g., assets for next page)
// Improves future navigation performance	Lower priority, so not useful for immediate needs

// 5)preconnect
// For optimizing connections to external resources (e.g., fonts, CDNs)
// Reduces latency	Unused connections may waste resources

// 6)prerender
// For pre-rendering entire pages that the user will likely navigate to
// Instant navigation	Resource-intensive, should be used sparingly

// 1. Code Splitting------------------------------------------>

// Code splitting is a technique used to split your application's JavaScript into multiple smaller
// bundles instead of one large bundle. This reduces the initial load time by loading only the necessary parts
// of the app, deferring less important code until it's needed.

// How it works: Instead of shipping all your code in a single file, code splitting allows you to break it
// into smaller chunks that can be dynamically loaded as needed. Modern tools like Webpack and Parcel support
// this out-of-the-box.

// Use case: React supports code splitting using dynamic import() statements or React.lazy() for loading
// components only when they are needed.

// Minifying -------------------------------------->
// Minifying is the process of removing unnecessary characters from the source code
// (like whitespace, comments, newlines, etc.) without changing its functionality.
// This reduces the size of JavaScript, CSS, or HTML files.

// How it works: Minification tools like UglifyJS, Terser, or CSSNano remove all unnecessary characters from the code.

// Use case: All production-level web assets (JavaScript, CSS, HTML) should be minified to reduce the
// file size and improve load times.

// Bundling--------------------------------------------------->
// Bundling is the process of combining multiple files (like JavaScript modules, CSS, images, etc.)
// into a single file (or a few files) to reduce the number of HTTP requests made by the browser.

// How it works: Tools like Webpack, Rollup, and Parcel take multiple files as input,
// bundle them together, and output one or more optimized bundles.

// Use case: In modern JavaScript frameworks, you might import many modules. Bundling groups
// them together so the browser doesn't need to request each file individually.

// Tree Shaking-------------------------------------------->
// Tree shaking is a technique used to eliminate dead code (unused imports or exports) from the bundle.
// It's a form of dead code elimination where only the code that is actually used in the application is included
// in the final bundle.

// How it works: Tree shaking is typically done by bundlers like Webpack or Rollup. When the bundler analyzes
// the code, it "shakes" out any unused parts (i.e., parts of the code that are never imported or called).

// Use case: If you import a utility library but only use one or two functions, tree shaking ensures
// that only those functions are included in the final bundle, rather than the entire library.

// Chunking-------------------------------------------->
// Chunking refers to breaking up a large JavaScript bundle into smaller "chunks" that can be loaded on demand.
// Chunking is often a result of code splitting and is a way to manage these smaller bundles.

// How it works: After splitting code (e.g., dynamic imports), the application is divided into separate "chunks."
// These chunks can be downloaded only when necessary.

// Use case: For example, different pages or components in a web app can be split into separate chunks,
// allowing the browser to download only the relevant parts.

// Server Optimization ------------------------------->
// Server optimization involves improving how the server delivers content to the client.
// It can include various techniques like using compression, caching, or content delivery networks (CDNs)
// to ensure faster and more efficient content delivery.

//Statefull vs Stateless components---------------------------->

// Key Differences
// State Management:
// Stateless: No internal state; rely solely on props.
// Stateful: Maintains internal state, allowing for more complex interactions and data management.

// Complexity:
// Stateless: Simpler and more focused on presentation.
// Stateful: More complex due to internal state and lifecycle management.

// Use Cases:
// Stateless: Ideal for presentational components that only render UI based on props.
// Stateful: Ideal for components that need to manage and respond to changes in internal
// data or interact with the lifecycle.

// Performance:
// Stateless: Generally more performant as there’s no state management overhead.
// Stateful: Slightly more overhead due to state management but necessary for interactive and dynamic UIs.

// Modern Usage:------------------------>
// Functional Components with Hooks:
// State Management: Using useState for local state management.
// Lifecycle Management: Using useEffect for side effects and lifecycle behavior.
// Custom Hooks: Allows sharing and encapsulating logic across components.

// import React, { useState, useEffect } from 'react';

// const StatefulFunctionalComponent = () => {
//   const [count, setCount] = useState(0);

//   useEffect(() => {
//     // Effect that runs on component mount and update
//     console.log('Component mounted or updated');

//     return () => {
//       // Cleanup logic if needed
//       console.log('Component will unmount');
//     };
//   }, [count]); // Dependency array

//   return (
//     <div>
//       <p>Count: {count}</p>
//       <button onClick={() => setCount(count + 1)}>Increment</button>
//     </div>
//   );
//};

//React fragment------------------------->
// In React, fragments are a feature that allows you to group multiple elements without adding extra nodes to the DOM.
// They are useful when you want to return multiple elements from a
// component without wrapping them in an additional HTML element.

// Key Concepts of Fragments:

// Purpose:
// Avoid Extra DOM Nodes: Fragments help avoid unnecessary wrapper elements that could affect styling or layout.
// Group Elements: Allow grouping of multiple elements in the render method without adding extra markup.

// Syntax:
// Using <React.Fragment>: You can use React.Fragment to wrap multiple elements.
// Shorthand Syntax: Use the shorthand syntax <> and </> for fragments

// import React from "react";

// const FragmentExample = () => (
//   <>
//     <h1>Hello</h1>
//     <p>This is a paragraph.</p>
//   </>
// );

// export default FragmentExample;

// import React from 'react';

// const ListExample = () => {
//   const items = ['Apple', 'Banana', 'Cherry'];

//   return (
//     <ul>
//       {items.map((item, index) => (
//         <React.Fragment key={index}>
//           <li>{item}</li>
//         </React.Fragment>
//       ))}
//     </ul>
//   );
// };

// export default ListExample;

//CSR vs SSR---------------------------------->

// Client-Side Rendering (CSR)
// Definition: In CSR, the initial HTML page is loaded with minimal content.
// The browser then uses JavaScript to fetch additional content and dynamically render the page on the client side.

// Server-Side Rendering (SSR)
// Definition: In SSR, the server generates the full HTML for a page and sends it to the browser.
// The browser receives a fully-rendered page with content already included.

// Choosing Between CSR and SSR

// Use CSR When:
// You need a highly interactive, dynamic application (e.g., SPAs).
// SEO is not a primary concern, or you use other techniques like prerendering or server-side APIs for SEO.

// Use SSR When:
// SEO is important, and you need the content to be available to search engines immediately.
// Initial page load performance is critical, and you want to deliver a fully-rendered page quickly.

//Required Attribute ------------------------------>

// You add the required attribute to an input field, and the browser will enforce
// that the field must be filled out before the form can be submitted.

// <form>
//   <label for="name">Name:</label>
//   <input type="text" id="name" name="name" required>

//   <label for="email">Email:</label>
//   <input type="email" id="email" name="email" required>

//   <button type="submit">Submit</button>
// </form>

// Datalist vs Select Tag -------------------->
// 1. <datalist>
// Purpose: Provides a set of options for an <input> field, allowing users to either select from
// the list or enter their own value.

// import React from 'react';

// export function App(props) {
//   return (
//     <div className='App'>
//       <form>
//         <label htmlFor="car">Choose a car:</label>
//         <input list="cars" id="car" name="car" />
//         <datalist id="cars">
//           <option value="BMW" />
//           <option value="Audi" />
//           <option value="Mercedes" />
//           <option value="Toyota" />
//         </datalist>
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// }

// 2. <select>
// Purpose: Provides a dropdown menu with a fixed set of options that users must choose from.
// <form>
//   <label for="car">Choose a car:</label>
//   <select id="car" name="car">
//     <option value="BMW">BMW</option>
//     <option value="Audi">Audi</option>
//     <option value="Mercedes">Mercedes</option>
//     <option value="Toyota">Toyota</option>
//   </select>
//   <button type="submit">Submit</button>
// </form>;

{
  /* <em> Tag
Purpose: The <em> tag is used to emphasize text. 
It is intended to convey a certain stress or importance to the text it wraps.

<i> Tag
Purpose: The <i> tag is used to apply italic styling to text. It is primarily used for text that is stylistically 
different from the surrounding text. */
}

//Flexbox vs Grids

// 1. Flexbox (Flexible Box Layout)------------------------>
// Purpose: Designed for one-dimensional layouts (either row or column). Flexbox is ideal when
// you need to align and distribute items
// along a single axis, either horizontally or vertically.

// Key Characteristics:

// One-dimensional: Works either along the row or column, not both simultaneously.
// Alignment: Flexbox excels at aligning and distributing space between items within a container, even when their size is unknown or dynamic.
// Item flexibility: Child items can grow or shrink to fill available space using flex-grow, flex-shrink, and flex-basis.
// Order control: The order of items can be changed without affecting the source HTML using the order property.

// Common Use Cases:
// Navigation bars
// Toolbars
// Horizontal or vertical lists
// Aligning elements within a container

// 2. CSS Grid (Grid Layout)----------------------------------->

// Purpose: Designed for two-dimensional layouts (both rows and columns). CSS Grid is
// ideal when you need to design complex layouts with explicit placement of items in both directions.

// Key Characteristics:

// Two-dimensional: Allows for layout along both rows and columns simultaneously.
// Grid-based: Creates a defined grid structure (with rows and columns) where items are placed within.
// Precise placement: Items can be explicitly placed in specific rows and columns using properties like grid-column
// and grid-row.
// Complex layouts: Can create more complex and responsive layouts that may not be achievable with Flexbox.

// Common Use Cases:
// Full-page layouts
// Dashboard designs with rows and columns
// Complex component layouts (e.g., galleries, forms)
// Aligning items both horizontally and vertically in a grid structure

//In React (or any modern JavaScript framework), there are two common ways to style HTML elements:------>

// Using Global CSS (styles.css): You target elements by their id, class, or tag name, which affects the global
// stylesheet and can apply to multiple elements , by linking this using the link tag in the head of index.html

/* styles.css */
// h1 {
//   color: blue;
// }

// #title {
//   font-size: 24px;
// }

// .button {
//   background-color: green;
//   color: white;
// }

// Using CSS Modules (module.css): CSS is scoped locally to the component,---->
// ensuring styles don't leak out or get affected by other styles elsewhere in the application.
// we can import this to diffrent componenets and use.

// /* Button.module.css */
// .button {
//   background-color: red;
//   color: white;
//   border-radius: 5px;
// }
