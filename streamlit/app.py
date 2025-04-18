import streamlit as st
import pandas as pd
import numpy as np

st.title('Cocktail Curator Dashboard')

# Add a header
st.header('Welcome to the Cocktail Analysis Dashboard')

# Add some sample data
data = pd.DataFrame({
    'Cocktail': ['Mojito', 'Margarita', 'Martini'],
    'Rating': [4.5, 4.2, 4.8],
    'Difficulty': ['Easy', 'Medium', 'Hard']
})

# Display the data
st.write('Sample Cocktail Data:')
st.dataframe(data)

# Add a chart
st.bar_chart(data.set_index('Cocktail')['Rating']) 