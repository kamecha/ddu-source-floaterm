*ddu-source-floaterm.txt*	window source for ddu.vim

Author: kamecha
License: MIT license

CONTENTS				*ddu-source-floaterm-contents*

Introduction		|ddu-source-floaterm-introduction|
Install			|ddu-source-floaterm-install|
Examples		|ddu-source-floaterm-examples|
Actions			|ddu-kind-floaterm-actions|
Params			|ddu-source-floaterm-params|


==============================================================================
INTRODUCTION				*ddu-source-floaterm-introduction*

This source collects floaterm buffer.


==============================================================================
INSTALL					*ddu-source-floaterm-install*

Please install both "ddu.vim" ,"denops.vim" and "vim-floaterm".

https://github.com/Shougo/ddu.vim
https://github.com/vim-denops/denops.vim
https://github.com/voldikss/vim-floaterm

==============================================================================
EXAMPLES				*ddu-source-floaterm-examples*

>
	call ddu#start(#{
		\   sources: [#{name: 'floaterm'],
		\   kindOptions: #{
		\	floaterm: #{
		\	    defaultAction: 'open'
		\	}
		\   }
		\})
<

==============================================================================
ACTIONS						   *ddu-kind-floaterm-actions*

					       *ddu-kind-floaterm-action-open*
open
		Open the selected floaterm.

					      *ddu-kind-floaterm-action-close*
close
		Close the selected floaterm.

==============================================================================
PARAMS					*ddu-source-floaterm-params*

==============================================================================
vim:tw=78:ts=8:ft=help:norl:noet:fen:noet:

