export type HeadingSize = 'large' | 'medium' | 'small';

export type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export interface HeadingProps {
  /**
   * Visual size of the heading
   */
  size?: HeadingSize;
  
  /**
   * Semantic HTML tag level
   */
  headingTag?: HeadingLevel;
}