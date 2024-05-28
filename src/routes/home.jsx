export default function Home() {
   return (
      <div>
        <nav>
          <ul>
            <li><a href={`/`}>Home</a></li>
            <li><a href={`/members`}>Members List</a></li>
            <li><a href={`/about`}>About</a></li>
          </ul>
        </nav>
      </div>
   );
}