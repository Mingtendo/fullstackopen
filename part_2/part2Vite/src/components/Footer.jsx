const Footer = () =>
{
	// How to define React-inline-style CSS. This is better than using separate CSS files,
	// as we can reuse components in React, and can use just their individual styling as defined.
	const footerStyle =
	{
		color: 'green',
		fontStyle: 'italic',
		fontSize: 16
	}

	return (
		<div style={footerStyle}>
			<br />
			<em>Note app, Department of Computer Science, University of Helsinki 2023</em>
		</div>
	)
}

export default Footer