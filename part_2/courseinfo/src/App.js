const Header = ({ header }) => 
{
	console.log('header data', header)
	return (
		<h1>{header}</h1>
	)
}
const Part = ({ part }) => 
	<li>
    	{part.name} {part.exercises}
  	</li>

const Content = ({content}) =>
{
	return (
		<ul>
			{content.map((note) =>
				<Part key={note.id} part={note}/>
			)}
		</ul>
	)
}

const Course = ({course}) => 
{
	console.log('data in parts as given to Course component', course)
	return (
		<div>
			<Header header={course.name}/>
			<Content content={course.parts} />
		</div>
		
	)
}

const App = () => 
{
  	const course = 
	{
		id: 1,
		name: 'Half Stack application development',
		parts:
		[
			{
				  name: 'Fundamentals of React',
				  exercises: 10,
				  id: 1
			},
			{
				  name: 'Using props to pass data',
				  exercises: 7,
				  id: 2
			},
			{
				  name: 'State of a component',
				  exercises: 14,
				  id: 3
			}
		]
	}
	

  	return <Course course={course} />
}

export default App