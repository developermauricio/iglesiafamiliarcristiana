/**
 *
 * -----------------------------------------------------------
 *
 * Codestar Framework
 * A Simple and Lightweight WordPress Option Framework
 *
 * -----------------------------------------------------------
 *
 */
;(function( $, window, document, undefined ) {
  'use strict';

  //
  // Constants
  //
  var WPGP   = WPGP || {};

  WPGP.funcs = {};

  WPGP.vars  = {
    onloaded: false,
    $body: $('body'),
    $window: $(window),
    $document: $(document),
    is_rtl: $('body').hasClass('rtl'),
    code_themes: [],
  };

  //
  // Helper Functions
  //
  WPGP.helper = {

    //
    // Generate UID
    //
    uid: function( prefix ) {
      return ( prefix || '' ) + Math.random().toString(36).substr(2, 9);
    },

    // Quote regular expression characters
    //
    preg_quote: function( str ) {
      return (str+'').replace(/(\[|\-|\])/g, "\\$1");
    },

    //
    // Reneme input names
    //
    name_nested_replace: function( $selector, field_id ) {

      var checks = [];
      var regex  = new RegExp('('+ WPGP.helper.preg_quote(field_id) +')\\[(\\d+)\\]', 'g');

      $selector.find(':radio').each(function() {
        if( this.checked || this.orginal_checked ) {
          this.orginal_checked = true;
        }
      });

      $selector.each( function( index ) {
        $(this).find(':input').each(function() {
          this.name = this.name.replace(regex, field_id +'['+ index +']');
          if( this.orginal_checked ) {
            this.checked = true;
          }
        });
      });

    },

    //
    // Debounce
    //
    debounce: function( callback, threshold, immediate ) {
      var timeout;
      return function() {
        var context = this, args = arguments;
        var later = function() {
          timeout = null;
          if( !immediate ) {
            callback.apply(context, args);
          }
        };
        var callNow = ( immediate && !timeout );
        clearTimeout( timeout );
        timeout = setTimeout( later, threshold );
        if( callNow ) {
          callback.apply(context, args);
        }
      };
    },

    //
    // Get a cookie
    //
    get_cookie: function( name ) {

      var e, b, cookie = document.cookie, p = name + '=';

      if( ! cookie ) {
        return;
      }

      b = cookie.indexOf( '; ' + p );

      if( b === -1 ) {
        b = cookie.indexOf(p);

        if( b !== 0 ) {
          return null;
        }
      } else {
        b += 2;
      }

      e = cookie.indexOf( ';', b );

      if( e === -1 ) {
        e = cookie.length;
      }

      return decodeURIComponent( cookie.substring( b + p.length, e ) );

    },

    //
    // Set a cookie
    //
    set_cookie: function( name, value, expires, path, domain, secure ) {

      var d = new Date();

      if( typeof( expires ) === 'object' && expires.toGMTString ) {
        expires = expires.toGMTString();
      } else if( parseInt( expires, 10 ) ) {
        d.setTime( d.getTime() + ( parseInt( expires, 10 ) * 1000 ) );
        expires = d.toGMTString();
      } else {
        expires = '';
      }

      document.cookie = name + '=' + encodeURIComponent( value ) +
        ( expires ? '; expires=' + expires : '' ) +
        ( path    ? '; path=' + path       : '' ) +
        ( domain  ? '; domain=' + domain   : '' ) +
        ( secure  ? '; secure'             : '' );

    },

    //
    // Remove a cookie
    //
    remove_cookie: function( name, path, domain, secure ) {
      WPGP.helper.set_cookie( name, '', -1000, path, domain, secure );
    },

  };

  //
  // Custom clone for textarea and select clone() bug
  //
  $.fn.wpgp_clone = function() {

    var base   = $.fn.clone.apply(this, arguments),
        clone  = this.find('select').add(this.filter('select')),
        cloned = base.find('select').add(base.filter('select'));

    for( var i = 0; i < clone.length; ++i ) {
      for( var j = 0; j < clone[i].options.length; ++j ) {

        if( clone[i].options[j].selected === true ) {
          cloned[i].options[j].selected = true;
        }

      }
    }

    this.find(':radio').each( function() {
      this.orginal_checked = this.checked;
    });

    return base;

  };

  //
  // Expand All Options
  //
  $.fn.wpgp_expand_all = function() {
    return this.each( function() {
      $(this).on('click', function( e ) {

        e.preventDefault();
        $('.wpgp-wrapper').toggleClass('wpgp-show-all');
        $('.wpgp-section').wpgp_reload_script();
        $(this).find('.fa').toggleClass('fa-indent').toggleClass('fa-outdent');

      });
    });
  };

  //
  // Options Navigation
  //
  $.fn.wpgp_nav_options = function() {
    return this.each( function() {

      var $nav    = $(this),
          $links  = $nav.find('a'),
          $hidden = $nav.closest('.wpgp').find('.wpgp-section-id'),
          $last_section;

      $(window).on('hashchange', function() {

        var hash  = window.location.hash.match(new RegExp('tab=([^&]*)'));
        var slug  = hash ? hash[1] : $links.first().attr('href').replace('#tab=', '');
        var $link = $('#wpgp-tab-link-'+ slug);

        if( $link.length > 0 ) {

          $link.closest('.wpgp-tab-depth-0').addClass('wpgp-tab-active').siblings().removeClass('wpgp-tab-active');
          $links.removeClass('wpgp-section-active');
          $link.addClass('wpgp-section-active');

          if( $last_section !== undefined ) {
            $last_section.hide();
          }

          var $section = $('#wpgp-section-'+slug);
          $section.css({display: 'block'});
          $section.wpgp_reload_script();

          $hidden.val(slug);

          $last_section = $section;

        }

      }).trigger('hashchange');

    });
  };

  //
  // Metabox Tabs
  //
  $.fn.wpgp_nav_metabox = function() {
    return this.each( function() {

      var $nav      = $(this),
          $links    = $nav.find('a'),
          unique_id = $nav.data('unique'),
          post_id   = $('#post_ID').val() || 'global',
          $last_section,
          $last_link;

      $links.on('click', function( e ) {

        e.preventDefault();

        var $link      = $(this),
            section_id = $link.data('section');

        if( $last_link !== undefined ) {
          $last_link.removeClass('wpgp-section-active');
        }

        if( $last_section !== undefined ) {
          $last_section.hide();
        }

        $link.addClass('wpgp-section-active');

        var $section = $('#wpgp-section-'+section_id);
        $section.css({display: 'block'});
        $section.wpgp_reload_script();

        WPGP.helper.set_cookie('wpgp-last-metabox-tab-'+ post_id +'-'+ unique_id, section_id);

        $last_section = $section;
        $last_link    = $link;

      });

      var get_cookie = WPGP.helper.get_cookie('wpgp-last-metabox-tab-'+ post_id +'-'+ unique_id);

      if( get_cookie ) {
        $nav.find('a[data-section="'+ get_cookie +'"]').trigger('click');
      } else {
        $links.first('a').trigger('click');
      }

    });
  };

  //
  // Metabox Page Templates Listener
  //
  $.fn.wpgp_page_templates = function() {
    if( this.length ) {

      $(document).on('change', '.editor-page-attributes__template select, #page_template', function() {

        var maybe_value = $(this).val() || 'default';

        $('.wpgp-page-templates').removeClass('wpgp-show').addClass('wpgp-hide');
        $('.wpgp-page-'+maybe_value.toLowerCase().replace(/[^a-zA-Z0-9]+/g,'-')).removeClass('wpgp-hide').addClass('wpgp-show');

      });

    }
  };

  //
  // Metabox Post Formats Listener
  //
  $.fn.wpgp_post_formats = function() {
    if( this.length ) {

      $(document).on('change', '.editor-post-format select, #formatdiv input[name="post_format"]', function() {

        var maybe_value = $(this).val() || 'default';

        // Fallback for classic editor version
        maybe_value = ( maybe_value === '0' ) ? 'default' : maybe_value;

        $('.wpgp-post-formats').removeClass('wpgp-show').addClass('wpgp-hide');
        $('.wpgp-post-format-'+maybe_value).removeClass('wpgp-hide').addClass('wpgp-show');

      });

    }
  };

  //
  // Search
  //
  $.fn.wpgp_search = function() {
    return this.each( function() {

      var $this    = $(this),
          $input   = $this.find('input');

      $input.on('change keyup', function() {

        var value    = $(this).val(),
            $wrapper = $('.wpgp-wrapper'),
            $section = $wrapper.find('.wpgp-section'),
            $fields  = $section.find('> .wpgp-field:not(.hidden)'),
            $titles  = $fields.find('> .wpgp-title, .wpgp-search-tags');

        if( value.length > 3 ) {

          $fields.addClass('wpgp-hidden');
          $wrapper.addClass('wpgp-search-all');

          $titles.each( function() {

            var $title = $(this);

            if( $title.text().match( new RegExp('.*?' + value + '.*?', 'i') ) ) {

              var $field = $title.closest('.wpgp-field');

              $field.removeClass('wpgp-hidden');
              $field.parent().wpgp_reload_script();

            }

          });

        } else {

          $fields.removeClass('wpgp-hidden');
          $wrapper.removeClass('wpgp-search-all');

        }

      });

    });
  };

  //
  // Sticky Header
  //
  $.fn.wpgp_sticky = function() {
    return this.each( function() {

      var $this     = $(this),
          $window   = $(window),
          $inner    = $this.find('.wpgp-header-inner'),
          padding   = parseInt( $inner.css('padding-left') ) + parseInt( $inner.css('padding-right') ),
          offset    = 32,
          scrollTop = 0,
          lastTop   = 0,
          ticking   = false,
          stickyUpdate = function() {

            var offsetTop = $this.offset().top,
                stickyTop = Math.max(offset, offsetTop - scrollTop ),
                winWidth  = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

            if( stickyTop <= offset && winWidth > 782 ) {
              $inner.css({width: $this.outerWidth()-padding});
              $this.css({height: $this.outerHeight()}).addClass( 'wpgp-sticky' );
            } else {
              $inner.removeAttr('style');
              $this.removeAttr('style').removeClass( 'wpgp-sticky' );
            }

          },
          requestTick = function() {

            if( !ticking ) {
              requestAnimationFrame( function() {
                stickyUpdate();
                ticking = false;
              });
            }

            ticking = true;

          },
          onSticky  = function() {

            scrollTop = $window.scrollTop();
            requestTick();

          };

      $window.on( 'scroll resize', onSticky);

      onSticky();

    });
  };

  //
  // Dependency System
  //
  $.fn.wpgp_dependency = function() {
    return this.each( function() {

      var $this     = $(this),
          ruleset   = $.wpgp_deps.createRuleset(),
          depends   = [],
          is_global = false;

      $this.children('[data-controller]').each( function() {

        var $field      = $(this),
            controllers = $field.data('controller').split('|'),
            conditions  = $field.data('condition').split('|'),
            values      = $field.data('value').toString().split('|'),
            rules       = ruleset;

        if( $field.data('depend-global') ) {
          is_global = true;
        }

        $.each(controllers, function( index, depend_id ) {

          var value     = values[index] || '',
              condition = conditions[index] || conditions[0];

          rules = rules.createRule('[data-depend-id="'+ depend_id +'"]', condition, value);

          rules.include($field);

          depends.push(depend_id);

        });

      });

      if( depends.length ) {

        if( is_global ) {
          $.wpgp_deps.enable(WPGP.vars.$body, ruleset, depends);
        } else {
          $.wpgp_deps.enable($this, ruleset, depends);
        }

      }

    });
  };

  //
  // Field: accordion
  //
  $.fn.wpgp_field_accordion = function() {
    return this.each( function() {

      var $titles = $(this).find('.wpgp-accordion-title');

      $titles.on('click', function() {

        var $title   = $(this),
            $icon    = $title.find('.wpgp-accordion-icon'),
            $content = $title.next();

        if( $icon.hasClass('fa-angle-right') ) {
          $icon.removeClass('fa-angle-right').addClass('fa-angle-down');
        } else {
          $icon.removeClass('fa-angle-down').addClass('fa-angle-right');
        }

        if( !$content.data( 'opened' ) ) {

          $content.wpgp_reload_script();
          $content.data( 'opened', true );

        }

        $content.toggleClass('wpgp-accordion-open');

      });

    });
  };

  //
  // Field: backup
  //
  $.fn.wpgp_field_backup = function() {
    return this.each( function() {

      if( window.wp.customize === undefined ) { return; }

      var base    = this,
          $this   = $(this),
          $body   = $('body'),
          $import = $this.find('.wpgp-import'),
          $reset  = $this.find('.wpgp-reset');

      base.notification = function( message_text ) {

        if( wp.customize.notifications && wp.customize.OverlayNotification ) {

          // clear if there is any saved data.
          if( !wp.customize.state('saved').get() ) {
            wp.customize.state('changesetStatus').set('trash');
            wp.customize.each( function( setting ) { setting._dirty = false; });
            wp.customize.state('saved').set(true);
          }

          // then show a notification overlay
          wp.customize.notifications.add( new wp.customize.OverlayNotification('wpgp_field_backup_notification', {
            type: 'info',
            message: message_text,
            loading: true
          }));

        }

      };

      $reset.on('click', function( e ) {

        e.preventDefault();

        if( WPGP.vars.is_confirm ) {

          base.notification( window.wpgp_vars.i18n.reset_notification );

          window.wp.ajax.post('wpgp-reset', {
            unique: $reset.data('unique'),
            nonce: $reset.data('nonce')
          })
          .done( function( response ) {
            window.location.reload(true);
          })
          .fail( function( response ) {
            alert( response.error );
            wp.customize.notifications.remove('wpgp_field_backup_notification');
          });

        }

      });

      $import.on('click', function( e ) {

        e.preventDefault();

        if( WPGP.vars.is_confirm ) {

          base.notification( window.wpgp_vars.i18n.import_notification );

          window.wp.ajax.post( 'wpgp-import', {
            unique: $import.data('unique'),
            nonce: $import.data('nonce'),
            import_data: $this.find('.wpgp-import-data').val()
          }).done( function( response ) {
            window.location.reload(true);
          }).fail( function( response ) {
            alert( response.error );
            wp.customize.notifications.remove('wpgp_field_backup_notification');
          });

        }

      });

    });
  };

  //
  // Field: background
  //
  $.fn.wpgp_field_background = function() {
    return this.each( function() {
      $(this).find('.wpgp--media').wpgp_reload_script();
    });
  };

  //
  // Field: code_editor
  //
  $.fn.wpgp_field_code_editor = function() {
    return this.each( function() {

      if( typeof CodeMirror !== 'function' ) { return; }

      var $this       = $(this),
          $textarea   = $this.find('textarea'),
          $inited     = $this.find('.CodeMirror'),
          data_editor = $textarea.data('editor');

      if( $inited.length ) {
        $inited.remove();
      }

      var interval = setInterval(function () {
        if( $this.is(':visible') ) {

          var code_editor = CodeMirror.fromTextArea( $textarea[0], data_editor );

          // load code-mirror theme css.
          if( data_editor.theme !== 'default' && WPGP.vars.code_themes.indexOf(data_editor.theme) === -1 ) {

            var $cssLink = $('<link>');

            $('#wpgp-codemirror-css').after( $cssLink );

            $cssLink.attr({
              rel: 'stylesheet',
              id: 'wpgp-codemirror-'+ data_editor.theme +'-css',
              href: data_editor.cdnURL +'/theme/'+ data_editor.theme +'.min.css',
              type: 'text/css',
              media: 'all'
            });

            WPGP.vars.code_themes.push(data_editor.theme);

          }

          CodeMirror.modeURL = data_editor.cdnURL +'/mode/%N/%N.min.js';
          CodeMirror.autoLoadMode(code_editor, data_editor.mode);

          code_editor.on( 'change', function( editor, event ) {
            $textarea.val( code_editor.getValue() ).trigger('change');
          });

          clearInterval(interval);

        }
      });

    });
  };

  //
  // Field: date
  //
  $.fn.wpgp_field_date = function() {
    return this.each( function() {

      var $this    = $(this),
          $inputs  = $this.find('input'),
          settings = $this.find('.wpgp-date-settings').data('settings'),
          wrapper  = '<div class="wpgp-datepicker-wrapper"></div>',
          $datepicker;

      var defaults = {
        showAnim: '',
        beforeShow: function(input, inst) {
          $(inst.dpDiv).addClass('wpgp-datepicker-wrapper');
        },
        onClose: function( input, inst ) {
          $(inst.dpDiv).removeClass('wpgp-datepicker-wrapper');
        },
      };

      settings = $.extend({}, settings, defaults);

      if( $inputs.length === 2 ) {

        settings = $.extend({}, settings, {
          onSelect: function( selectedDate ) {

            var $this  = $(this),
                $from  = $inputs.first(),
                option = ( $inputs.first().attr('id') === $(this).attr('id') ) ? 'minDate' : 'maxDate',
                date   = $.datepicker.parseDate( settings.dateFormat, selectedDate );

            $inputs.not(this).datepicker('option', option, date );

          }
        });

      }

      $inputs.each( function(){

        var $input = $(this);

        if( $input.hasClass('hasDatepicker') ) {
          $input.removeAttr('id').removeClass('hasDatepicker');
        }

        $input.datepicker(settings);

      });

    });
  };

  //
  // Field: fieldset
  //
  $.fn.wpgp_field_fieldset = function() {
    return this.each( function() {
      $(this).find('.wpgp-fieldset-content').wpgp_reload_script();
    });
  };

  //
  // Field: gallery
  //
  $.fn.wpgp_field_gallery = function() {
    return this.each( function() {

      var $this  = $(this),
          $edit  = $this.find('.wpgp-edit-gallery'),
          $clear = $this.find('.wpgp-clear-gallery'),
          $list  = $this.find('ul'),
          $input = $this.find('input'),
          $img   = $this.find('img'),
          wp_media_frame;

      $this.on('click', '.wpgp-button, .wpgp-edit-gallery', function( e ) {

        var $el   = $(this),
            ids   = $input.val(),
            what  = ( $el.hasClass('wpgp-edit-gallery') ) ? 'edit' : 'add',
            state = ( what === 'add' && !ids.length ) ? 'gallery' : 'gallery-edit';

        e.preventDefault();

        if( typeof window.wp === 'undefined' || ! window.wp.media || ! window.wp.media.gallery ) { return; }

         // Open media with state
        if( state === 'gallery' ) {

          wp_media_frame = window.wp.media({
            library: {
              type: 'image'
            },
            frame: 'post',
            state: 'gallery',
            multiple: true
          });

          wp_media_frame.open();

        } else {

          wp_media_frame = window.wp.media.gallery.edit( '[gallery ids="'+ ids +'"]' );

          if( what === 'add' ) {
            wp_media_frame.setState('gallery-library');
          }

        }

        // Media Update
        wp_media_frame.on( 'update', function( selection ) {

          $list.empty();

          var selectedIds = selection.models.map( function( attachment ) {

            var item  = attachment.toJSON();
            var thumb = ( item.sizes && item.sizes.thumbnail && item.sizes.thumbnail.url ) ? item.sizes.thumbnail.url : item.url;

            $list.append('<li><img src="'+ thumb +'"></li>');

            return item.id;

          });

          $input.val( selectedIds.join( ',' ) ).trigger('change');
          $clear.removeClass('hidden');
          $edit.removeClass('hidden');

        });

      });

      $clear.on('click', function( e ) {
        e.preventDefault();
        $list.empty();
        $input.val('').trigger('change');
        $clear.addClass('hidden');
        $edit.addClass('hidden');
      });

    });

  };

  //
  // Field: group
  //
  $.fn.wpgp_field_group = function() {
    return this.each( function() {

      var $this     = $(this),
          $fieldset = $this.children('.wpgp-fieldset'),
          $group    = $fieldset.length ? $fieldset : $this,
          $wrapper  = $group.children('.wpgp-cloneable-wrapper'),
          $hidden   = $group.children('.wpgp-cloneable-hidden'),
          $max      = $group.children('.wpgp-cloneable-max'),
          $min      = $group.children('.wpgp-cloneable-min'),
          field_id  = $wrapper.data('field-id'),
          unique_id = $wrapper.data('unique-id'),
          is_number = Boolean( Number( $wrapper.data('title-number') ) ),
          max       = parseInt( $wrapper.data('max') ),
          min       = parseInt( $wrapper.data('min') );

      // clear accordion arrows if multi-instance
      if( $wrapper.hasClass('ui-accordion') ) {
        $wrapper.find('.ui-accordion-header-icon').remove();
      }

      var update_title_numbers = function( $selector ) {
        $selector.find('.wpgp-cloneable-title-number').each( function( index ) {
          $(this).html( ( $(this).closest('.wpgp-cloneable-item').index()+1 ) + '.' );
        });
      };

      $wrapper.accordion({
        header: '> .wpgp-cloneable-item > .wpgp-cloneable-title',
        collapsible : true,
        active: false,
        animate: false,
        heightStyle: 'content',
        icons: {
          'header': 'wpgp-cloneable-header-icon fa fa-angle-right',
          'activeHeader': 'wpgp-cloneable-header-icon fa fa-angle-down'
        },
        activate: function( event, ui ) {

          var $panel  = ui.newPanel;
          var $header = ui.newHeader;

          if( $panel.length && !$panel.data( 'opened' ) ) {

            var $fields = $panel.children();
            var $first  = $fields.first().find(':input').first();
            var $title  = $header.find('.wpgp-cloneable-value');

            $first.on('keyup', function( event ) {
              $title.text($first.val());
            });

            $panel.wpgp_reload_script();
            $panel.data( 'opened', true );
            $panel.data( 'retry', false );

          } else if( $panel.data( 'retry' ) ) {

            $panel.wpgp_reload_script_retry();
            $panel.data( 'retry', false );

          }

        }
      });

      $wrapper.sortable({
        axis: 'y',
        handle: '.wpgp-cloneable-title,.wpgp-cloneable-sort',
        helper: 'original',
        cursor: 'move',
        placeholder: 'widget-placeholder',
        start: function( event, ui ) {

          $wrapper.accordion({ active:false });
          $wrapper.sortable('refreshPositions');
          ui.item.children('.wpgp-cloneable-content').data('retry', true);

        },
        update: function( event, ui ) {

          WPGP.helper.name_nested_replace( $wrapper.children('.wpgp-cloneable-item'), field_id );
          $wrapper.wpgp_customizer_refresh();

          if( is_number ) {
            update_title_numbers($wrapper);
          }

        },
      });

      $group.children('.wpgp-cloneable-add').on('click', function( e ) {

        e.preventDefault();

        var count = $wrapper.children('.wpgp-cloneable-item').length;

        $min.hide();

        if( max && (count+1) > max ) {
          $max.show();
          return;
        }

        var new_field_id = unique_id + field_id + '['+ count +']';

        var $cloned_item = $hidden.wpgp_clone(true);

        $cloned_item.removeClass('wpgp-cloneable-hidden');

        $cloned_item.find(':input[name!="_pseudo"]').each( function() {
          this.name = new_field_id + this.name.replace( ( this.name.startsWith('_nonce') ? '_nonce' : unique_id ), '');
        });

        $cloned_item.find('.wpgp-data-wrapper').each( function(){
          $(this).attr('data-unique-id', new_field_id );
        });

        $wrapper.append($cloned_item);
        $wrapper.accordion('refresh');
        $wrapper.accordion({active: count});
        $wrapper.wpgp_customizer_refresh();
        $wrapper.wpgp_customizer_listen({closest: true});

        if( is_number ) {
          update_title_numbers($wrapper);
        }

      });

      var event_clone = function( e ) {

        e.preventDefault();

        var count = $wrapper.children('.wpgp-cloneable-item').length;

        $min.hide();

        if( max && (count+1) > max ) {
          $max.show();
          return;
        }

        var $this           = $(this),
            $parent         = $this.parent().parent(),
            $cloned_helper  = $parent.children('.wpgp-cloneable-helper').wpgp_clone(true),
            $cloned_title   = $parent.children('.wpgp-cloneable-title').wpgp_clone(),
            $cloned_content = $parent.children('.wpgp-cloneable-content').wpgp_clone(),
            cloned_regex    = new RegExp('('+ WPGP.helper.preg_quote(field_id) +')\\[(\\d+)\\]', 'g');

        $cloned_content.find('.wpgp-data-wrapper').each( function(){
          var $this = $(this);
          $this.attr('data-unique-id', $this.attr('data-unique-id').replace(cloned_regex, field_id +'['+ ($parent.index()+1) +']') );
        });

        var $cloned = $('<div class="wpgp-cloneable-item" />');

        $cloned.append($cloned_helper);
        $cloned.append($cloned_title);
        $cloned.append($cloned_content);

        $wrapper.children().eq($parent.index()).after($cloned);

        WPGP.helper.name_nested_replace( $wrapper.children('.wpgp-cloneable-item'), field_id );

        $wrapper.accordion('refresh');
        $wrapper.wpgp_customizer_refresh();
        $wrapper.wpgp_customizer_listen({closest: true});

        if( is_number ) {
          update_title_numbers($wrapper);
        }

      };

      $wrapper.children('.wpgp-cloneable-item').children('.wpgp-cloneable-helper').on('click', '.wpgp-cloneable-clone', event_clone);
      $group.children('.wpgp-cloneable-hidden').children('.wpgp-cloneable-helper').on('click', '.wpgp-cloneable-clone', event_clone);

      var event_remove = function( e ) {

        e.preventDefault();

        var count = $wrapper.children('.wpgp-cloneable-item').length;

        $max.hide();
        $min.hide();

        if( min && (count-1) < min ) {
          $min.show();
          return;
        }

        $(this).closest('.wpgp-cloneable-item').remove();

        WPGP.helper.name_nested_replace( $wrapper.children('.wpgp-cloneable-item'), field_id );

        $wrapper.wpgp_customizer_refresh();

        if( is_number ) {
          update_title_numbers($wrapper);
        }

      };

      $wrapper.children('.wpgp-cloneable-item').children('.wpgp-cloneable-helper').on('click', '.wpgp-cloneable-remove', event_remove);
      $group.children('.wpgp-cloneable-hidden').children('.wpgp-cloneable-helper').on('click', '.wpgp-cloneable-remove', event_remove);

    });
  };

  //
  // Field: icon
  //
  $.fn.wpgp_field_icon = function() {
    return this.each( function() {

      var $this = $(this);

      $this.on('click', '.wpgp-icon-add', function( e ) {

        e.preventDefault();

        var $button = $(this);
        var $modal  = $('#wpgp-modal-icon');

        $modal.show();

        WPGP.vars.$icon_target = $this;

        if( !WPGP.vars.icon_modal_loaded ) {

          $modal.find('.wpgp-modal-loading').show();

          window.wp.ajax.post( 'wpgp-get-icons', {
            nonce: $button.data('nonce')
          }).done( function( response ) {

            $modal.find('.wpgp-modal-loading').hide();

            WPGP.vars.icon_modal_loaded = true;

            var $load = $modal.find('.wpgp-modal-load').html( response.content );

            $load.on('click', 'a', function( e ) {

              e.preventDefault();

              var icon = $(this).data('wpgp-icon');

              WPGP.vars.$icon_target.find('i').removeAttr('class').addClass(icon);
              WPGP.vars.$icon_target.find('input').val(icon).trigger('change');
              WPGP.vars.$icon_target.find('.wpgp-icon-preview').removeClass('hidden');
              WPGP.vars.$icon_target.find('.wpgp-icon-remove').removeClass('hidden');

              $modal.hide();

            });

            $modal.on('change keyup', '.wpgp-icon-search', function() {

              var value  = $(this).val(),
                  $icons = $load.find('a');

              $icons.each( function() {

                var $elem = $(this);

                if( $elem.data('wpgp-icon').search( new RegExp( value, 'i' ) ) < 0 ) {
                  $elem.hide();
                } else {
                  $elem.show();
                }

              });

            });

            $modal.on('click', '.wpgp-modal-close, .wpgp-modal-overlay', function() {
              $modal.hide();
            });

          }).fail( function( response ) {
            $modal.find('.wpgp-modal-loading').hide();
            $modal.find('.wpgp-modal-load').html( response.error );
            $modal.on('click', function() { $modal.hide(); });
          });
        }

      });

      $this.on('click', '.wpgp-icon-remove', function( e ) {
        e.preventDefault();
        $this.find('.wpgp-icon-preview').addClass('hidden');
        $this.find('input').val('').trigger('change');
        $(this).addClass('hidden');
      });

    });
  };

  //
  // Field: media
  //
  $.fn.wpgp_field_media = function() {
    return this.each( function() {

      var $this          = $(this),
          $upload_button = $this.find('.wpgp--button'),
          $remove_button = $this.find('.wpgp--remove'),
          $library       = $upload_button.data('library') && $upload_button.data('library').split(',') || '',
          wp_media_frame;

      $upload_button.on('click', function( e ) {

        e.preventDefault();

        if( typeof window.wp === 'undefined' || ! window.wp.media || ! window.wp.media.gallery ) {
          return;
        }

        if( wp_media_frame ) {
          wp_media_frame.open();
          return;
        }

        wp_media_frame = window.wp.media({
          library: {
            type: $library
          }
        });

        wp_media_frame.on( 'select', function() {

          var thumbnail;
          var attributes   = wp_media_frame.state().get('selection').first().attributes;
          var preview_size = $upload_button.data('preview-size') || 'thumbnail';

          if( $library.length && $library.indexOf(attributes.subtype) === -1 && $library.indexOf(attributes.type) === -1 ) {
            return;
          }

          $this.find('.wpgp--id').val( attributes.id );
          $this.find('.wpgp--width').val( attributes.width );
          $this.find('.wpgp--height').val( attributes.height );
          $this.find('.wpgp--alt').val( attributes.alt );
          $this.find('.wpgp--title').val( attributes.title );
          $this.find('.wpgp--description').val( attributes.description );

          if( typeof attributes.sizes !== 'undefined' && typeof attributes.sizes.thumbnail !== 'undefined' && preview_size === 'thumbnail' ) {
            thumbnail = attributes.sizes.thumbnail.url;
          } else if( typeof attributes.sizes !== 'undefined' && typeof attributes.sizes.full !== 'undefined' ) {
            thumbnail = attributes.sizes.full.url;
          } else {
            thumbnail = attributes.icon;
          }

          $remove_button.removeClass('hidden');

          $this.find('.wpgp--preview').removeClass('hidden');
          $this.find('.wpgp--src').attr('src', thumbnail);
          $this.find('.wpgp--thumbnail').val( thumbnail );
          $this.find('.wpgp--url').val( attributes.url ).trigger('change');

        });

        wp_media_frame.open();

      });

      $remove_button.on('click', function( e ) {
        e.preventDefault();
        $remove_button.addClass('hidden');
        $this.find('input').val('');
        $this.find('.wpgp--preview').addClass('hidden');
        $this.find('.wpgp--thumbnail');
        $this.find('.wpgp--url').trigger('change');
      });

    });

  };

  //
  // Field: repeater
  //
  $.fn.wpgp_field_repeater = function() {
    return this.each( function() {

      var $this     = $(this),
          $fieldset = $this.children('.wpgp-fieldset'),
          $repeater = $fieldset.length ? $fieldset : $this,
          $wrapper  = $repeater.children('.wpgp-repeater-wrapper'),
          $hidden   = $repeater.children('.wpgp-repeater-hidden'),
          $max      = $repeater.children('.wpgp-repeater-max'),
          $min      = $repeater.children('.wpgp-repeater-min'),
          field_id  = $wrapper.data('field-id'),
          unique_id = $wrapper.data('unique-id'),
          max       = parseInt( $wrapper.data('max') ),
          min       = parseInt( $wrapper.data('min') );


      $wrapper.children('.wpgp-repeater-item').children('.wpgp-repeater-content').wpgp_reload_script();

      $wrapper.sortable({
        axis: 'y',
        handle: '.wpgp-repeater-sort',
        helper: 'original',
        cursor: 'move',
        placeholder: 'widget-placeholder',
        update: function( event, ui ) {

          WPGP.helper.name_nested_replace( $wrapper.children('.wpgp-repeater-item'), field_id );
          $wrapper.wpgp_customizer_refresh();
          ui.item.wpgp_reload_script_retry();

        }
      });

      $repeater.children('.wpgp-repeater-add').on('click', function( e ) {

        e.preventDefault();

        var count = $wrapper.children('.wpgp-repeater-item').length;

        $min.hide();

        if( max && (count+1) > max ) {
          $max.show();
          return;
        }

        var new_field_id = unique_id + field_id + '['+ count +']';

        var $cloned_item = $hidden.wpgp_clone(true);

        $cloned_item.removeClass('wpgp-repeater-hidden');

        $cloned_item.find(':input[name!="_pseudo"]').each( function() {
          this.name = new_field_id + this.name.replace( ( this.name.startsWith('_nonce') ? '_nonce' : unique_id ), '');
        });

        $cloned_item.find('.wpgp-data-wrapper').each( function(){
          $(this).attr('data-unique-id', new_field_id );
        });

        $wrapper.append($cloned_item);
        $cloned_item.children('.wpgp-repeater-content').wpgp_reload_script();
        $wrapper.wpgp_customizer_refresh();
        $wrapper.wpgp_customizer_listen({closest: true});

      });

      var event_clone = function( e ) {

        e.preventDefault();

        var count = $wrapper.children('.wpgp-repeater-item').length;

        $min.hide();

        if( max && (count+1) > max ) {
          $max.show();
          return;
        }

        var $this           = $(this),
            $parent         = $this.parent().parent().parent(),
            $cloned_content = $parent.children('.wpgp-repeater-content').wpgp_clone(),
            $cloned_helper  = $parent.children('.wpgp-repeater-helper').wpgp_clone(true),
            cloned_regex    = new RegExp('('+ WPGP.helper.preg_quote(field_id) +')\\[(\\d+)\\]', 'g');

        $cloned_content.find('.wpgp-data-wrapper').each( function(){
          var $this = $(this);
          $this.attr('data-unique-id', $this.attr('data-unique-id').replace(cloned_regex, field_id +'['+ ($parent.index()+1) +']') );
        });

        var $cloned = $('<div class="wpgp-repeater-item" />');

        $cloned.append($cloned_content);
        $cloned.append($cloned_helper);

        $wrapper.children().eq($parent.index()).after($cloned);

        $cloned.children('.wpgp-repeater-content').wpgp_reload_script();

        WPGP.helper.name_nested_replace( $wrapper.children('.wpgp-repeater-item'), field_id );

        $wrapper.wpgp_customizer_refresh();
        $wrapper.wpgp_customizer_listen({closest: true});

      };

      $wrapper.children('.wpgp-repeater-item').children('.wpgp-repeater-helper').on('click', '.wpgp-repeater-clone', event_clone);
      $repeater.children('.wpgp-repeater-hidden').children('.wpgp-repeater-helper').on('click', '.wpgp-repeater-clone', event_clone);

      var event_remove = function( e ) {

        e.preventDefault();

        var count = $wrapper.children('.wpgp-repeater-item').length;

        $max.hide();
        $min.hide();

        if( min && (count-1) < min ) {
          $min.show();
          return;
        }

        $(this).closest('.wpgp-repeater-item').remove();

        WPGP.helper.name_nested_replace( $wrapper.children('.wpgp-repeater-item'), field_id );

        $wrapper.wpgp_customizer_refresh();

      };

      $wrapper.children('.wpgp-repeater-item').children('.wpgp-repeater-helper').on('click', '.wpgp-repeater-remove', event_remove);
      $repeater.children('.wpgp-repeater-hidden').children('.wpgp-repeater-helper').on('click', '.wpgp-repeater-remove', event_remove);

    });
  };

  //
  // Field: slider
  //
  $.fn.wpgp_field_slider = function() {
    return this.each( function() {

      var $this   = $(this),
          $input  = $this.find('input'),
          $slider = $this.find('.wpgp-slider-ui'),
          data    = $input.data(),
          value   = $input.val() || 0;

      if( $slider.hasClass('ui-slider') ) {
        $slider.empty();
      }

      $slider.slider({
        range: 'min',
        value: value,
        min: data.min,
        max: data.max,
        step: data.step,
        slide: function( e, o ) {
          $input.val( o.value ).trigger('change');
        }
      });

      $input.keyup( function() {
        $slider.slider('value', $input.val());
      });

    });
  };

  //
  // Field: sortable
  //
  $.fn.wpgp_field_sortable = function() {
    return this.each( function() {

      var $sortable = $(this).find('.wpgp--sortable');

      $sortable.sortable({
        axis: 'y',
        helper: 'original',
        cursor: 'move',
        placeholder: 'widget-placeholder',
        update: function( event, ui ) {
          $sortable.wpgp_customizer_refresh();
        }
      });

      $sortable.find('.wpgp--sortable-content').wpgp_reload_script();

    });
  };

  //
  // Field: sorter
  //
  $.fn.wpgp_field_sorter = function() {
    return this.each( function() {

      var $this         = $(this),
          $enabled      = $this.find('.wpgp-enabled'),
          $has_disabled = $this.find('.wpgp-disabled'),
          $disabled     = ( $has_disabled.length ) ? $has_disabled : false;

      $enabled.sortable({
        connectWith: $disabled,
        placeholder: 'ui-sortable-placeholder',
        update: function( event, ui ) {

          var $el = ui.item.find('input');

          if( ui.item.parent().hasClass('wpgp-enabled') ) {
            $el.attr('name', $el.attr('name').replace('disabled', 'enabled'));
          } else {
            $el.attr('name', $el.attr('name').replace('enabled', 'disabled'));
          }

          $this.wpgp_customizer_refresh();

        }
      });

      if( $disabled ) {

        $disabled.sortable({
          connectWith: $enabled,
          placeholder: 'ui-sortable-placeholder',
          update: function( event, ui ) {
            $this.wpgp_customizer_refresh();
          }
        });

      }

    });
  };

  //
  // Field: spinner
  //
  $.fn.wpgp_field_spinner = function() {
    return this.each( function() {

      var $this   = $(this),
          $input  = $this.find('input'),
          $inited = $this.find('.ui-spinner-button'),
          $unit   = $input.data('unit');

      if( $inited.length ) {
        $inited.remove();
      }

      $input.spinner({
        max: $input.data('max') || 100,
        min: $input.data('min') || 0,
        step: $input.data('step') || 1,
        create: function( event, ui ) {
          if( $unit.length ) {
            $this.find('.ui-spinner-up').after('<span class="ui-button-text-only wpgp--unit">'+ $unit +'</span>');
          }
        },
        spin: function (event, ui ) {
          $input.val(ui.value).trigger('change');
        }
      });

    });
  };

  //
  // Field: switcher
  //
  $.fn.wpgp_field_switcher = function() {
    return this.each( function() {

      var $switcher = $(this).find('.wpgp--switcher');

      $switcher.on('click', function() {

        var value  = 0;
        var $input = $switcher.find('input');

        if( $switcher.hasClass('wpgp--active') ) {
          $switcher.removeClass('wpgp--active');
        } else {
          value = 1;
          $switcher.addClass('wpgp--active');
        }

        $input.val(value).trigger('change');

      });

    });
  };

  //
  // Field: tabbed
  //
  $.fn.wpgp_field_tabbed = function() {
    return this.each( function() {

      var $this     = $(this),
          $links    = $this.find('.wpgp-tabbed-nav a'),
          $sections = $this.find('.wpgp-tabbed-section');

      $sections.eq(0).wpgp_reload_script();

      $links.on( 'click', function( e ) {

       e.preventDefault();

        var $link    = $(this),
            index    = $link.index(),
            $section = $sections.eq(index);

        $link.addClass('wpgp-tabbed-active').siblings().removeClass('wpgp-tabbed-active');
        $section.wpgp_reload_script();
        $section.removeClass('hidden').siblings().addClass('hidden');

      });

    });
  };

  //
  // Field: typography
  //
  $.fn.wpgp_field_typography = function() {
    return this.each(function () {

      var base          = this;
      var $this         = $(this);
      var loaded_fonts  = [];
      var webfonts      = wpgp_typography_json.webfonts;
      var googlestyles  = wpgp_typography_json.googlestyles;
      var defaultstyles = wpgp_typography_json.defaultstyles;

      //
      //
      // Sanitize google font subset
      base.sanitize_subset = function( subset ) {
        subset = subset.replace('-ext', ' Extended');
        subset = subset.charAt(0).toUpperCase() + subset.slice(1);
        return subset;
      };

      //
      //
      // Sanitize google font styles (weight and style)
      base.sanitize_style = function( style ) {
        return googlestyles[style] ? googlestyles[style] : style;
      };

      //
      //
      // Load google font
      base.load_google_font = function( font_family, weight, style ) {

        if( font_family && typeof WebFont === 'object' ) {

          weight = weight ? weight.replace('normal', '') : '';
          style  = style ? style.replace('normal', '') : '';

          if( weight || style ) {
            font_family = font_family +':'+ weight + style;
          }

          if( loaded_fonts.indexOf( font_family ) === -1 ) {
            WebFont.load({ google: { families: [font_family] } });
          }

          loaded_fonts.push( font_family );

        }

      };

      //
      //
      // Append select options
      base.append_select_options = function( $select, options, condition, type, is_multi ) {

        $select.find('option').not(':first').remove();

        var opts = '';

        $.each( options, function( key, value ) {

          var selected;
          var name = value;

          // is_multi
          if( is_multi ) {
            selected = ( condition && condition.indexOf(value) !== -1 ) ? ' selected' : '';
          } else {
            selected = ( condition && condition === value ) ? ' selected' : '';
          }

          if( type === 'subset' ) {
            name = base.sanitize_subset( value );
          } else if( type === 'style' ){
            name = base.sanitize_style( value );
          }

          opts += '<option value="'+ value +'"'+ selected +'>'+ name +'</option>';

        });

        $select.append(opts).trigger('wpgp.change').trigger('chosen:updated');

      };

      base.init = function () {

        //
        //
        // Constants
        var selected_styles = [];
        var $typography     = $this.find('.wpgp--typography');
        var $type           = $this.find('.wpgp--type');
        var $styles         = $this.find('.wpgp--block-font-style');
        var unit            = $typography.data('unit');
        var exclude_fonts   = $typography.data('exclude') ? $typography.data('exclude').split(',') : [];

        //
        //
        // Chosen init
        if( $this.find('.wpgp--chosen').length ) {

          var $chosen_selects = $this.find('select');

          $chosen_selects.each( function(){

            var $chosen_select = $(this),
                $chosen_inited = $chosen_select.parent().find('.chosen-container');

            if( $chosen_inited.length ) {
              $chosen_inited.remove();
            }

            $chosen_select.chosen({
              allow_single_deselect: true,
              disable_search_threshold: 15,
              width: '100%'
            });

          });

        }

        //
        //
        // Font family select
        var $font_family_select = $this.find('.wpgp--font-family');
        var first_font_family   = $font_family_select.val();

        // Clear default font family select options
        $font_family_select.find('option').not(':first-child').remove();

        var opts = '';

        $.each(webfonts, function( type, group ) {

          // Check for exclude fonts
          if( exclude_fonts && exclude_fonts.indexOf(type) !== -1 ) { return; }

          opts += '<optgroup label="' + group.label + '">';

          $.each(group.fonts, function( key, value ) {

            // use key if value is object
            value = ( typeof value === 'object' ) ? key : value;
            var selected = ( value === first_font_family ) ? ' selected' : '';
            opts += '<option value="'+ value +'" data-type="'+ type +'"'+ selected +'>'+ value +'</option>';

          });

          opts += '</optgroup>';

        });

        // Append google font select options
        $font_family_select.append(opts).trigger('chosen:updated');

        //
        //
        // Font style select
        var $font_style_block = $this.find('.wpgp--block-font-style');

        if( $font_style_block.length ) {

          var $font_style_select = $this.find('.wpgp--font-style-select');
          var first_style_value  = $font_style_select.val() ? $font_style_select.val().replace(/normal/g, '' ) : '';

          //
          // Font Style on on change listener
          $font_style_select.on('change wpgp.change', function( event ) {

            var style_value = $font_style_select.val();

            // set a default value
            if( !style_value && selected_styles && selected_styles.indexOf('normal') === -1 ) {
              style_value = selected_styles[0];
            }

            // set font weight, for eg. replacing 800italic to 800
            var font_normal = ( style_value && style_value !== 'italic' && style_value === 'normal' ) ? 'normal' : '';
            var font_weight = ( style_value && style_value !== 'italic' && style_value !== 'normal' ) ? style_value.replace('italic', '') : font_normal;
            var font_style  = ( style_value && style_value.substr(-6) === 'italic' ) ? 'italic' : '';

            $this.find('.wpgp--font-weight').val( font_weight );
            $this.find('.wpgp--font-style').val( font_style );

          });

          //
          //
          // Extra font style select
          var $extra_font_style_block = $this.find('.wpgp--block-extra-styles');

          if( $extra_font_style_block.length ) {
            var $extra_font_style_select = $this.find('.wpgp--extra-styles');
            var first_extra_style_value  = $extra_font_style_select.val();
          }

        }

        //
        //
        // Subsets select
        var $subset_block = $this.find('.wpgp--block-subset');
        if( $subset_block.length ) {
          var $subset_select = $this.find('.wpgp--subset');
          var first_subset_select_value = $subset_select.val();
          var subset_multi_select = $subset_select.data('multiple') || false;
        }

        //
        //
        // Backup font family
        var $backup_font_family_block = $this.find('.wpgp--block-backup-font-family');

        //
        //
        // Font Family on Change Listener
        $font_family_select.on('change wpgp.change', function( event ) {

          // Hide subsets on change
          if( $subset_block.length ) {
            $subset_block.addClass('hidden');
          }

          // Hide extra font style on change
          if( $extra_font_style_block.length ) {
            $extra_font_style_block.addClass('hidden');
          }

          // Hide backup font family on change
          if( $backup_font_family_block.length ) {
            $backup_font_family_block.addClass('hidden');
          }

          var $selected = $font_family_select.find(':selected');
          var value     = $selected.val();
          var type      = $selected.data('type');

          if( type && value ) {

            // Show backup fonts if font type google or custom
            if( ( type === 'google' || type === 'custom' ) && $backup_font_family_block.length ) {
              $backup_font_family_block.removeClass('hidden');
            }

            // Appending font style select options
            if( $font_style_block.length ) {

              // set styles for multi and normal style selectors
              var styles = defaultstyles;

              // Custom or gogle font styles
              if( type === 'google' && webfonts[type].fonts[value][0] ) {
                styles = webfonts[type].fonts[value][0];
              } else if( type === 'custom' && webfonts[type].fonts[value] ) {
                styles = webfonts[type].fonts[value];
              }

              selected_styles = styles;

              // Set selected style value for avoid load errors
              var set_auto_style  = ( styles.indexOf('normal') !== -1 ) ? 'normal' : styles[0];
              var set_style_value = ( first_style_value && styles.indexOf(first_style_value) !== -1 ) ? first_style_value : set_auto_style;

              // Append style select options
              base.append_select_options( $font_style_select, styles, set_style_value, 'style' );

              // Clear first value
              first_style_value = false;

              // Show style select after appended
              $font_style_block.removeClass('hidden');

              // Appending extra font style select options
              if( type === 'google' && $extra_font_style_block.length && styles.length > 1 ) {

                // Append extra-style select options
                base.append_select_options( $extra_font_style_select, styles, first_extra_style_value, 'style', true );

                // Clear first value
                first_extra_style_value = false;

                // Show style select after appended
                $extra_font_style_block.removeClass('hidden');

              }

            }

            // Appending google fonts subsets select options
            if( type === 'google' && $subset_block.length && webfonts[type].fonts[value][1] ) {

              var subsets          = webfonts[type].fonts[value][1];
              var set_auto_subset  = ( subsets.length < 2 && subsets[0] !== 'latin' ) ? subsets[0] : '';
              var set_subset_value = ( first_subset_select_value && subsets.indexOf(first_subset_select_value) !== -1 ) ? first_subset_select_value : set_auto_subset;

              // check for multiple subset select
              set_subset_value = ( subset_multi_select && first_subset_select_value ) ? first_subset_select_value : set_subset_value;

              base.append_select_options( $subset_select, subsets, set_subset_value, 'subset', subset_multi_select );

              first_subset_select_value = false;

              $subset_block.removeClass('hidden');

            }

          } else {

            // Clear Styles
            $styles.find(':input').val('');

            // Clear subsets options if type and value empty
            if( $subset_block.length ) {
              $subset_select.find('option').not(':first-child').remove();
              $subset_select.trigger('chosen:updated');
            }

            // Clear font styles options if type and value empty
            if( $font_style_block.length ) {
              $font_style_select.find('option').not(':first-child').remove();
              $font_style_select.trigger('chosen:updated');
            }

          }

          // Update font type input value
          $type.val(type);

        }).trigger('wpgp.change');

        //
        //
        // Preview
        var $preview_block = $this.find('.wpgp--block-preview');

        if( $preview_block.length ) {

          var $preview = $this.find('.wpgp--preview');

          // Set preview styles on change
          $this.on('change', WPGP.helper.debounce( function( event ) {

            $preview_block.removeClass('hidden');

            var font_family       = $font_family_select.val(),
                font_weight       = $this.find('.wpgp--font-weight').val(),
                font_style        = $this.find('.wpgp--font-style').val(),
                font_size         = $this.find('.wpgp--font-size').val(),
                font_variant      = $this.find('.wpgp--font-variant').val(),
                line_height       = $this.find('.wpgp--line-height').val(),
                text_align        = $this.find('.wpgp--text-align').val(),
                text_transform    = $this.find('.wpgp--text-transform').val(),
                text_decoration   = $this.find('.wpgp--text-decoration').val(),
                text_color        = $this.find('.wpgp--color').val(),
                word_spacing      = $this.find('.wpgp--word-spacing').val(),
                letter_spacing    = $this.find('.wpgp--letter-spacing').val(),
                custom_style      = $this.find('.wpgp--custom-style').val(),
                type              = $this.find('.wpgp--type').val();

            if( type === 'google' ) {
              base.load_google_font(font_family, font_weight, font_style);
            }

            var properties = {};

            if( font_family     ) { properties.fontFamily     = font_family;           }
            if( font_weight     ) { properties.fontWeight     = font_weight;           }
            if( font_style      ) { properties.fontStyle      = font_style;            }
            if( font_variant    ) { properties.fontVariant    = font_variant;          }
            if( font_size       ) { properties.fontSize       = font_size + unit;      }
            if( line_height     ) { properties.lineHeight     = line_height + unit;    }
            if( letter_spacing  ) { properties.letterSpacing  = letter_spacing + unit; }
            if( word_spacing    ) { properties.wordSpacing    = word_spacing + unit;   }
            if( text_align      ) { properties.textAlign      = text_align;            }
            if( text_transform  ) { properties.textTransform  = text_transform;        }
            if( text_decoration ) { properties.textDecoration = text_decoration;       }
            if( text_color      ) { properties.color          = text_color;            }

            $preview.removeAttr('style');

            // Customs style attribute
            if( custom_style ) { $preview.attr('style', custom_style); }

            $preview.css(properties);

          }, 100 ) );

          // Preview black and white backgrounds trigger
          $preview_block.on('click', function() {

            $preview.toggleClass('wpgp--black-background');

            var $toggle = $preview_block.find('.wpgp--toggle');

            if( $toggle.hasClass('fa-toggle-off') ) {
              $toggle.removeClass('fa-toggle-off').addClass('fa-toggle-on');
            } else {
              $toggle.removeClass('fa-toggle-on').addClass('fa-toggle-off');
            }

          });

          if( !$preview_block.hasClass('hidden') ) {
            $this.trigger('change');
          }

        }

      };

      base.init();

    });
  };

  //
  // Field: upload
  //
  $.fn.wpgp_field_upload = function() {
    return this.each( function() {

      var $this          = $(this),
          $input         = $this.find('input'),
          $upload_button = $this.find('.wpgp--button'),
          $remove_button = $this.find('.wpgp--remove'),
          $library       = $upload_button.data('library') && $upload_button.data('library').split(',') || '',
          wp_media_frame;

      $input.on('change', function( e ) {
        if( $input.val() ) {
          $remove_button.removeClass('hidden');
        } else {
          $remove_button.addClass('hidden');
        }
      });

      $upload_button.on('click', function( e ) {

        e.preventDefault();

        if( typeof window.wp === 'undefined' || ! window.wp.media || ! window.wp.media.gallery ) {
          return;
        }

        if( wp_media_frame ) {
          wp_media_frame.open();
          return;
        }

        wp_media_frame = window.wp.media({
          library: {
            type: $library
          },
        });

        wp_media_frame.on( 'select', function() {

          var attributes = wp_media_frame.state().get('selection').first().attributes;

          if( $library.length && $library.indexOf(attributes.subtype) === -1 && $library.indexOf(attributes.type) === -1 ) {
            return;
          }

          $input.val(attributes.url).trigger('change');

        });

        wp_media_frame.open();

      });

      $remove_button.on('click', function( e ) {
        e.preventDefault();
        $input.val('').trigger('change');
      });

    });

  };

  //
  // Field: wp_editor
  //
  $.fn.wpgp_field_wp_editor = function() {
    return this.each( function() {

      if( typeof window.wp.editor === 'undefined' || typeof window.tinyMCEPreInit === 'undefined' || typeof window.tinyMCEPreInit.mceInit.wpgp_wp_editor === 'undefined' ) {
        return;
      }

      var $this     = $(this),
          $editor   = $this.find('.wpgp-wp-editor'),
          $textarea = $this.find('textarea');

      // If there is wp-editor remove it for avoid dupliated wp-editor conflicts.
      var $has_wp_editor = $this.find('.wp-editor-wrap').length || $this.find('.mce-container').length;

      if( $has_wp_editor ) {
        $editor.empty();
        $editor.append($textarea);
        $textarea.css('display', '');
      }

      // Generate a unique id
      var uid = WPGP.helper.uid('wpgp-editor-');

      $textarea.attr('id', uid);

      // Get default editor settings
      var default_editor_settings = {
        tinymce: window.tinyMCEPreInit.mceInit.wpgp_wp_editor,
        quicktags: window.tinyMCEPreInit.qtInit.wpgp_wp_editor
      };

      // Get default editor settings
      var field_editor_settings = $editor.data('editor-settings');

      // Add on change event handle
      var editor_on_change = function( editor ) {
        editor.on('change', WPGP.helper.debounce( function() {
          editor.save();
          $textarea.trigger('change');
        }, 250 ) );
      };

      // Callback for old wp editor
      var wpEditor = wp.oldEditor ? wp.oldEditor : wp.editor;

      if( wpEditor && wpEditor.hasOwnProperty('autop') ) {
        wp.editor.autop = wpEditor.autop;
        wp.editor.removep = wpEditor.removep;
        wp.editor.initialize = wpEditor.initialize;
      }

      // Extend editor selector and on change event handler
      default_editor_settings.tinymce = $.extend( {}, default_editor_settings.tinymce, { selector: '#'+ uid, setup: editor_on_change } );

      // Override editor tinymce settings
      if( field_editor_settings.tinymce === false ) {
        default_editor_settings.tinymce = false;
        $editor.addClass('wpgp-no-tinymce');
      }

      // Override editor quicktags settings
      if( field_editor_settings.quicktags === false ) {
        default_editor_settings.quicktags = false;
        $editor.addClass('wpgp-no-quicktags');
      }

      // Wait until :visible
      var interval = setInterval(function () {
        if( $this.is(':visible') ) {
          window.wp.editor.initialize(uid, default_editor_settings);
          clearInterval(interval);
        }
      });

      // Add Media buttons
      if( field_editor_settings.media_buttons && window.wpgp_media_buttons ) {

        var $editor_buttons = $editor.find('.wp-media-buttons');

        if( $editor_buttons.length ) {

          $editor_buttons.find('.wpgp-shortcode-button').data('editor-id', uid);

        } else {

          var $media_buttons = $(window.wpgp_media_buttons);

          $media_buttons.find('.wpgp-shortcode-button').data('editor-id', uid);

          $editor.prepend( $media_buttons );

        }

      }

    });

  };

  //
  // Confirm
  //
  $.fn.wpgp_confirm = function() {
    return this.each( function() {
      $(this).on('click', function( e ) {

        var confirm_text    = $(this).data('confirm') || window.wpgp_vars.i18n.confirm;
        var confirm_answer  = confirm( confirm_text );
        WPGP.vars.is_confirm = true;

        if( !confirm_answer ) {
          e.preventDefault();
          WPGP.vars.is_confirm = false;
          return false;
        }

      });
    });
  };

  $.fn.serializeObject = function(){

    var obj = {};

    $.each( this.serializeArray(), function(i,o){
      var n = o.name,
        v = o.value;

        obj[n] = obj[n] === undefined ? v
          : $.isArray( obj[n] ) ? obj[n].concat( v )
          : [ obj[n], v ];
    });

    return obj;

  };

  //
  // Options Save
  //
  $.fn.wpgp_save = function() {
    return this.each( function() {

      var $this    = $(this),
          $buttons = $('.wpgp-save'),
          $panel   = $('.wpgp-options'),
          flooding = false,
          timeout;

      $this.on('click', function( e ) {

        if( !flooding ) {

          var $text  = $this.data('save'),
              $value = $this.val();

          $buttons.attr('value', $text);

          if( $this.hasClass('wpgp-save-ajax') ) {

            e.preventDefault();

            $panel.addClass('wpgp-saving');
            $buttons.prop('disabled', true);

            window.wp.ajax.post( 'wpgp_'+ $panel.data('unique') +'_ajax_save', {
              data: $('#wpgp-form').serializeJSONWPGP()
            })
            .done( function( response ) {

              clearTimeout(timeout);

              var $result_success = $('.wpgp-form-success');

              $result_success.empty().append(response.notice).slideDown('fast', function() {
                timeout = setTimeout( function() {
                  $result_success.slideUp('fast');
                }, 2000);
              });

              // clear errors
              $('.wpgp-error').remove();

              var $append_errors = $('.wpgp-form-error');

              $append_errors.empty().hide();

              if( Object.keys( response.errors ).length ) {

                var error_icon = '<i class="wpgp-label-error wpgp-error">!</i>';

                $.each(response.errors, function( key, error_message ) {

                  var $field = $('[data-depend-id="'+ key +'"]'),
                      $link  = $('#wpgp-tab-link-'+ ($field.closest('.wpgp-section').index()+1)),
                      $tab   = $link.closest('.wpgp-tab-depth-0');

                  $field.closest('.wpgp-fieldset').append( '<p class="wpgp-text-error wpgp-error">'+ error_message +'</p>' );

                  if( !$link.find('.wpgp-error').length ) {
                    $link.append( error_icon );
                  }

                  if( !$tab.find('.wpgp-arrow .wpgp-error').length ) {
                    $tab.find('.wpgp-arrow').append( error_icon );
                  }

                  console.log(error_message);

                  $append_errors.append( '<div>'+ error_icon +' '+ error_message + '</div>' );

                });

                $append_errors.show();

              }

              $panel.removeClass('wpgp-saving');
              $buttons.prop('disabled', false).attr('value', $value);
              flooding = false;

            })
            .fail( function( response ) {
              alert( response.error );
            });

          }

        }

        flooding = true;

      });

    });
  };

  //
  // Taxonomy Framework
  //
  $.fn.wpgp_taxonomy = function() {
    return this.each( function() {

      var $this = $(this),
          $form = $this.parents('form');

      if( $form.attr('id') === 'addtag' ) {

        var $submit = $form.find('#submit'),
            $cloned = $this.find('.wpgp-field').wpgp_clone();

        $submit.on( 'click', function() {

          if( !$form.find('.form-required').hasClass('form-invalid') ) {

            $this.data('inited', false);

            $this.empty();

            $this.html( $cloned );

            $cloned = $cloned.wpgp_clone();

            $this.wpgp_reload_script();

          }

        });

      }

    });
  };

  //
  // Shortcode Framework
  //
  $.fn.wpgp_shortcode = function() {

    var base = this;

    base.shortcode_parse = function( serialize, key ) {

      var shortcode = '';

      $.each(serialize, function( shortcode_key, shortcode_values ) {

        key = ( key ) ? key : shortcode_key;

        shortcode += '[' + key;

        $.each(shortcode_values, function( shortcode_tag, shortcode_value ) {

          if( shortcode_tag === 'content' ) {

            shortcode += ']';
            shortcode += shortcode_value;
            shortcode += '[/'+ key +'';

          } else {

            shortcode += base.shortcode_tags( shortcode_tag, shortcode_value );

          }

        });

        shortcode += ']';

      });

      return shortcode;

    };

    base.shortcode_tags = function( shortcode_tag, shortcode_value ) {

      var shortcode = '';

      if( shortcode_value !== '' ) {

        if( typeof shortcode_value === 'object' && !$.isArray( shortcode_value ) ) {

          $.each(shortcode_value, function( sub_shortcode_tag, sub_shortcode_value ) {

            // sanitize spesific key/value
            switch( sub_shortcode_tag ) {

              case 'background-image':
                sub_shortcode_value = ( sub_shortcode_value.url  ) ? sub_shortcode_value.url : '';
              break;

            }

            if( sub_shortcode_value !== '' ) {
              shortcode += ' ' + sub_shortcode_tag.replace('-', '_') + '="' + sub_shortcode_value.toString() + '"';
            }

          });

        } else {

          shortcode += ' ' + shortcode_tag.replace('-', '_') + '="' + shortcode_value.toString() + '"';

        }

      }

      return shortcode;

    };

    base.insertAtChars = function( _this, currentValue ) {

      var obj = ( typeof _this[0].name !== 'undefined' ) ? _this[0] : _this;

      if( obj.value.length && typeof obj.selectionStart !== 'undefined' ) {
        obj.focus();
        return obj.value.substring( 0, obj.selectionStart ) + currentValue + obj.value.substring( obj.selectionEnd, obj.value.length );
      } else {
        obj.focus();
        return currentValue;
      }

    };

    base.send_to_editor = function( html, editor_id ) {

      var tinymce_editor;

      if( typeof tinymce !== 'undefined' ) {
        tinymce_editor = tinymce.get( editor_id );
      }

      if( tinymce_editor && !tinymce_editor.isHidden() ) {
        tinymce_editor.execCommand( 'mceInsertContent', false, html );
      } else {
        var $editor = $('#'+editor_id);
        $editor.val( base.insertAtChars( $editor, html ) ).trigger('change');
      }

    };

    return this.each( function() {

      var $modal   = $(this),
          $load    = $modal.find('.wpgp-modal-load'),
          $content = $modal.find('.wpgp-modal-content'),
          $insert  = $modal.find('.wpgp-modal-insert'),
          $loading = $modal.find('.wpgp-modal-loading'),
          $select  = $modal.find('select'),
          modal_id = $modal.data('modal-id'),
          nonce    = $modal.data('nonce'),
          editor_id,
          target_id,
          gutenberg_id,
          sc_key,
          sc_name,
          sc_view,
          sc_group,
          $cloned,
          $button;

      $(document).on('click', '.wpgp-shortcode-button[data-modal-id="'+ modal_id +'"]', function( e ) {

        e.preventDefault();

        $button      = $(this);
        editor_id    = $button.data('editor-id')    || false;
        target_id    = $button.data('target-id')    || false;
        gutenberg_id = $button.data('gutenberg-id') || false;

        $modal.show();

        // single usage trigger first shortcode
        if( $modal.hasClass('wpgp-shortcode-single') && sc_name === undefined ) {
          $select.trigger('change');
        }

      });

      $select.on( 'change', function() {

        var $option   = $(this);
        var $selected = $option.find(':selected');

        sc_key   = $option.val();
        sc_name  = $selected.data('shortcode');
        sc_view  = $selected.data('view') || 'normal';
        sc_group = $selected.data('group') || sc_name;

        $load.empty();

        if( sc_key ) {

          $loading.show();

          window.wp.ajax.post( 'wpgp-get-shortcode-'+ modal_id, {
            shortcode_key: sc_key,
            nonce: nonce
          })
          .done( function( response ) {

            $loading.hide();

            var $appended = $(response.content).appendTo($load);

            $insert.parent().removeClass('hidden');

            $cloned = $appended.find('.wpgp--repeat-shortcode').wpgp_clone();

            $appended.wpgp_reload_script();
            $appended.find('.wpgp-fields').wpgp_reload_script();

          });

        } else {

          $insert.parent().addClass('hidden');

        }

      });

      $insert.on('click', function( e ) {

        e.preventDefault();

        var shortcode = '';
        var serialize = $modal.find('.wpgp-field:not(.hidden)').find(':input:not(.ignore)').serializeObjectWPGP();

        switch ( sc_view ) {

          case 'contents':
            var contentsObj = ( sc_name ) ? serialize[sc_name] : serialize;
            $.each(contentsObj, function( sc_key, sc_value ) {
              var sc_tag = ( sc_name ) ? sc_name : sc_key;
              shortcode += '['+ sc_tag +']'+ sc_value +'[/'+ sc_tag +']';
            });
          break;

          case 'group':

            shortcode += '[' + sc_name;
            $.each(serialize[sc_name], function( sc_key, sc_value ) {
              shortcode += base.shortcode_tags( sc_key, sc_value );
            });
            shortcode += ']';
            shortcode += base.shortcode_parse( serialize[sc_group], sc_group );
            shortcode += '[/' + sc_name + ']';

          break;

          case 'repeater':
            shortcode += base.shortcode_parse( serialize[sc_group], sc_group );
          break;

          default:
            shortcode += base.shortcode_parse( serialize );
          break;

        }

        shortcode = ( shortcode === '' ) ? '['+ sc_name +']' : shortcode;

        if( gutenberg_id ) {

          var content = window.wpgp_gutenberg_props.attributes.hasOwnProperty('shortcode') ? window.wpgp_gutenberg_props.attributes.shortcode : '';
          window.wpgp_gutenberg_props.setAttributes({shortcode: content + shortcode});

        } else if( editor_id ) {

          base.send_to_editor( shortcode, editor_id );

        } else {

          var $textarea = (target_id) ? $(target_id) : $button.parent().find('textarea');
          $textarea.val( base.insertAtChars( $textarea, shortcode ) ).trigger('change');

        }

        $modal.hide();

      });

      $modal.on('click', '.wpgp--repeat-button', function( e ) {

        e.preventDefault();

        var $repeatable = $modal.find('.wpgp--repeatable');
        var $new_clone  = $cloned.wpgp_clone();
        var $remove_btn = $new_clone.find('.wpgp-repeat-remove');

        var $appended = $new_clone.appendTo( $repeatable );

        $new_clone.find('.wpgp-fields').wpgp_reload_script();

        WPGP.helper.name_nested_replace( $modal.find('.wpgp--repeat-shortcode'), sc_group );

        $remove_btn.on('click', function() {

          $new_clone.remove();

          WPGP.helper.name_nested_replace( $modal.find('.wpgp--repeat-shortcode'), sc_group );

        });

      });

      $modal.on('click', '.wpgp-modal-close, .wpgp-modal-overlay', function() {
        $modal.hide();
      });

    });
  };

  //
  // WP Color Picker
  //
  if( typeof Color === 'function' ) {

    Color.fn.toString = function() {

      if( this._alpha < 1 ) {
        return this.toCSS('rgba', this._alpha).replace(/\s+/g, '');
      }

      var hex = parseInt( this._color, 10 ).toString( 16 );

      if( this.error ) { return ''; }

      if( hex.length < 6 ) {
        for (var i = 6 - hex.length - 1; i >= 0; i--) {
          hex = '0' + hex;
        }
      }

      return '#' + hex;

    };

  }

  WPGP.funcs.parse_color = function( color ) {

    var value = color.replace(/\s+/g, ''),
        trans = ( value.indexOf('rgba') !== -1 ) ? parseFloat( value.replace(/^.*,(.+)\)/, '$1') * 100 ) : 100,
        rgba  = ( trans < 100 ) ? true : false;

    return { value: value, transparent: trans, rgba: rgba };

  };

  $.fn.wpgp_color = function() {
    return this.each( function() {

      var $input        = $(this),
          picker_color  = WPGP.funcs.parse_color( $input.val() ),
          palette_color = window.wpgp_vars.color_palette.length ? window.wpgp_vars.color_palette : true,
          $container;

      // Destroy and Reinit
      if( $input.hasClass('wp-color-picker') ) {
        $input.closest('.wp-picker-container').after($input).remove();
      }

      $input.wpColorPicker({
        palettes: palette_color,
        change: function( event, ui ) {

          var ui_color_value = ui.color.toString();

          $container.removeClass('wpgp--transparent-active');
          $container.find('.wpgp--transparent-offset').css('background-color', ui_color_value);
          $input.val(ui_color_value).trigger('change');

        },
        create: function() {

          $container = $input.closest('.wp-picker-container');

          var a8cIris = $input.data('a8cIris'),
              $transparent_wrap = $('<div class="wpgp--transparent-wrap">' +
                                '<div class="wpgp--transparent-slider"></div>' +
                                '<div class="wpgp--transparent-offset"></div>' +
                                '<div class="wpgp--transparent-text"></div>' +
                                '<div class="wpgp--transparent-button">transparent <i class="fa fa-toggle-off"></i></div>' +
                                '</div>').appendTo( $container.find('.wp-picker-holder') ),
              $transparent_slider = $transparent_wrap.find('.wpgp--transparent-slider'),
              $transparent_text   = $transparent_wrap.find('.wpgp--transparent-text'),
              $transparent_offset = $transparent_wrap.find('.wpgp--transparent-offset'),
              $transparent_button = $transparent_wrap.find('.wpgp--transparent-button');

          if( $input.val() === 'transparent' ) {
            $container.addClass('wpgp--transparent-active');
          }

          $transparent_button.on('click', function() {
            if( $input.val() !== 'transparent' ) {
              $input.val('transparent').trigger('change').removeClass('iris-error');
              $container.addClass('wpgp--transparent-active');
            } else {
              $input.val( a8cIris._color.toString() ).trigger('change');
              $container.removeClass('wpgp--transparent-active');
            }
          });

          $transparent_slider.slider({
            value: picker_color.transparent,
            step: 1,
            min: 0,
            max: 100,
            slide: function( event, ui ) {

              var slide_value = parseFloat( ui.value / 100 );
              a8cIris._color._alpha = slide_value;
              $input.wpColorPicker( 'color', a8cIris._color.toString() );
              $transparent_text.text( ( slide_value === 1 || slide_value === 0 ? '' : slide_value ) );

            },
            create: function() {

              var slide_value = parseFloat( picker_color.transparent / 100 ),
                  text_value  = slide_value < 1 ? slide_value : '';

              $transparent_text.text(text_value);
              $transparent_offset.css('background-color', picker_color.value);

              $container.on('click', '.wp-picker-clear', function() {

                a8cIris._color._alpha = 1;
                $transparent_text.text('');
                $transparent_slider.slider('option', 'value', 100);
                $container.removeClass('wpgp--transparent-active');
                $input.trigger('change');

              });

              $container.on('click', '.wp-picker-default', function() {

                var default_color = WPGP.funcs.parse_color( $input.data('default-color') ),
                    default_value = parseFloat( default_color.transparent / 100 ),
                    default_text  = default_value < 1 ? default_value : '';

                a8cIris._color._alpha = default_value;
                $transparent_text.text(default_text);
                $transparent_slider.slider('option', 'value', default_color.transparent);

              });

            }
          });
        }
      });

    });
  };

  //
  // ChosenJS
  //
  $.fn.wpgp_chosen = function() {
    return this.each( function() {

      var $this       = $(this),
          $inited     = $this.parent().find('.chosen-container'),
          is_sortable = $this.hasClass('wpgp-chosen-sortable') || false,
          is_ajax     = $this.hasClass('wpgp-chosen-ajax') || false,
          is_multiple = $this.attr('multiple') || false,
          set_width   = is_multiple ? '100%' : 'auto',
          set_options = $.extend({
            allow_single_deselect: true,
            disable_search_threshold: 10,
            width: set_width,
            no_results_text: window.wpgp_vars.i18n.no_results_text,
          }, $this.data('chosen-settings'));

      if( $inited.length ) {
        $inited.remove();
      }

      // Chosen ajax
      if( is_ajax ) {

        var set_ajax_options = $.extend({
          data: {
            type: 'post',
            nonce: '',
          },
          allow_single_deselect: true,
          disable_search_threshold: -1,
          width: '100%',
          min_length: 3,
          type_delay: 500,
          typing_text: window.wpgp_vars.i18n.typing_text,
          searching_text: window.wpgp_vars.i18n.searching_text,
          no_results_text: window.wpgp_vars.i18n.no_results_text,
        }, $this.data('chosen-settings'));

        $this.WPGPAjaxChosen(set_ajax_options);

      } else {

        $this.chosen(set_options);

      }

      // Chosen keep options order
      if( is_multiple ) {

        var $hidden_select = $this.parent().find('.wpgp-hidden-select');
        var $hidden_value  = $hidden_select.val() || [];

        $this.on('change', function(obj, result) {

          if( result && result.selected ) {
            $hidden_select.append( '<option value="'+ result.selected +'" selected="selected">'+ result.selected +'</option>' );
          } else if( result && result.deselected ) {
            $hidden_select.find('option[value="'+ result.deselected +'"]').remove();
          }

          // Force customize refresh
          if( $hidden_select.children().length === 0 && window.wp.customize !== undefined ) {
            window.wp.customize.control( $hidden_select.data('customize-setting-link') ).setting.set('');
          }

          $hidden_select.trigger('change');

        });

        // Chosen order abstract
        $this.WPGPChosenOrder($hidden_value, true);

      }

      // Chosen sortable
      if( is_sortable ) {

        var $chosen_container = $this.parent().find('.chosen-container');
        var $chosen_choices   = $chosen_container.find('.chosen-choices');

        $chosen_choices.bind('mousedown', function( event ) {
          if( $(event.target).is('span') ) {
            event.stopPropagation();
          }
        });

        $chosen_choices.sortable({
          items: 'li:not(.search-field)',
          helper: 'orginal',
          cursor: 'move',
          placeholder: 'search-choice-placeholder',
          start: function(e,ui) {
            ui.placeholder.width( ui.item.innerWidth() );
            ui.placeholder.height( ui.item.innerHeight() );
          },
          update: function( e, ui ) {

            var select_options = '';
            var chosen_object  = $this.data('chosen');
            var $prev_select   = $this.parent().find('.wpgp-hidden-select');

            $chosen_choices.find('.search-choice-close').each( function() {
              var option_array_index = $(this).data('option-array-index');
              $.each(chosen_object.results_data, function(index, data) {
                if( data.array_index === option_array_index ){
                  select_options += '<option value="'+ data.value +'" selected>'+ data.value +'</option>';
                }
              });
            });

            $prev_select.children().remove();
            $prev_select.append(select_options);
            $prev_select.trigger('change');

          }
        });

      }

    });
  };

  //
  // Helper Checkbox Checker
  //
  $.fn.wpgp_checkbox = function() {
    return this.each( function() {

      var $this     = $(this),
          $input    = $this.find('.wpgp--input'),
          $checkbox = $this.find('.wpgp--checkbox');

      $checkbox.on('click', function() {
        $input.val( Number( $checkbox.prop('checked') ) ).trigger('change');
      });

    });
  };

  //
  // Siblings
  //
  $.fn.wpgp_siblings = function() {
    return this.each( function() {

      var $this     = $(this),
          $siblings = $this.find('.wpgp--sibling'),
          multiple  = $this.data('multiple') || false;

      $siblings.on('click', function() {

        var $sibling = $(this);

        if( multiple ) {

          if( $sibling.hasClass('wpgp--active') ) {
            $sibling.removeClass('wpgp--active');
            $sibling.find('input').prop('checked', false).trigger('change');
          } else {
            $sibling.addClass('wpgp--active');
            $sibling.find('input').prop('checked', true).trigger('change');
          }

        } else {

          $this.find('input').prop('checked', false);
          $sibling.find('input').prop('checked', true).trigger('change');
          $sibling.addClass('wpgp--active').siblings().removeClass('wpgp--active');

        }

      });

    });
  };

  //
  // Help Tooltip
  //
  $.fn.wpgp_help = function() {
    return this.each( function() {

      var $this = $(this),
          $tooltip,
          offset_left;

      $this.on({
        mouseenter: function() {

          $tooltip = $( '<div class="wpgp-tooltip"></div>' ).html( $this.find('.wpgp-help-text').html() ).appendTo('body');
          offset_left = ( WPGP.vars.is_rtl ) ? ( $this.offset().left + 24 ) : ( $this.offset().left - $tooltip.outerWidth() );

          $tooltip.css({
            top: $this.offset().top - ( ( $tooltip.outerHeight() / 2 ) - 14 ),
            left: offset_left,
          });

        },
        mouseleave: function() {

          if( $tooltip !== undefined ) {
            $tooltip.remove();
          }

        }

      });

    });
  };

  //
  // Customize Refresh
  //
  $.fn.wpgp_customizer_refresh = function() {
    return this.each( function() {

      var $this    = $(this),
          $complex = $this.closest('.wpgp-customize-complex');

      if( $complex.length ) {

        var $input  = $complex.find(':input'),
            $unique = $complex.data('unique-id'),
            $option = $complex.data('option-id'),
            obj     = $input.serializeObjectWPGP(),
            data    = ( !$.isEmptyObject(obj) ) ? obj[$unique][$option] : '',
            control = window.wp.customize.control($unique +'['+ $option +']');

        // clear the value to force refresh.
        control.setting._value = null;

        control.setting.set( data );

      } else {

        $this.find(':input').first().trigger('change');

      }

      $(document).trigger('wpgp-customizer-refresh', $this);

    });
  };

  //
  // Customize Listen Form Elements
  //
  $.fn.wpgp_customizer_listen = function( options ) {

    var settings = $.extend({
      closest: false,
    }, options );

    return this.each( function() {

      if( window.wp.customize === undefined ) { return; }

      var $this     = ( settings.closest ) ? $(this).closest('.wpgp-customize-complex') : $(this),
          $input    = $this.find(':input'),
          unique_id = $this.data('unique-id'),
          option_id = $this.data('option-id');

      if( unique_id === undefined ) { return; }

      $input.on('change keyup', WPGP.helper.debounce( function() {

        var obj = $this.find(':input').serializeObjectWPGP();
        var val = ( !$.isEmptyObject(obj) && obj[unique_id] && obj[unique_id][option_id] ) ? obj[unique_id][option_id] : '';

        window.wp.customize.control( unique_id +'['+ option_id +']' ).setting.set( val );

      }, 250 ) );

    });
  };

  //
  // Customizer Listener for Reload JS
  //
  $(document).on('expanded', '.control-section', function() {

    var $this  = $(this);

    if( $this.hasClass('open') && !$this.data('inited') ) {

      var $fields  = $this.find('.wpgp-customize-field');
      var $complex = $this.find('.wpgp-customize-complex');

      if( $fields.length ) {
        $this.wpgp_dependency();
        $fields.wpgp_reload_script({dependency: false});
        $complex.wpgp_customizer_listen();
      }

      $this.data('inited', true);

    }

  });

  //
  // Window on resize
  //
  WPGP.vars.$window.on('resize wpgp.resize', WPGP.helper.debounce( function( event ) {

    var window_width = navigator.userAgent.indexOf('AppleWebKit/') > -1 ? WPGP.vars.$window.width() : window.innerWidth;

    if( window_width <= 782 && !WPGP.vars.onloaded ) {
      $('.wpgp-section').wpgp_reload_script();
      WPGP.vars.onloaded  = true;
    }

  }, 200)).trigger('wpgp.resize');

  //
  // Widgets Framework
  //
  $.fn.wpgp_widgets = function() {
    if( this.length ) {

      $(document).on('widget-added widget-updated', function( event, $widget ) {
        $widget.find('.wpgp-fields').wpgp_reload_script();
      });

      $('.widgets-sortables, .control-section-sidebar').on('sortstop', function( event, ui ) {
        ui.item.find('.wpgp-fields').wpgp_reload_script_retry();
      });

      $(document).on('click', '.widget-top', function( event ) {
        $(this).parent().find('.wpgp-fields').wpgp_reload_script();
      });

    }
  };

  //
  // Retry Plugins
  //
  $.fn.wpgp_reload_script_retry = function() {
    return this.each( function() {

      var $this = $(this);

      if( $this.data('inited') ) {
        $this.children('.wpgp-field-wp_editor').wpgp_field_wp_editor();
      }

    });
  };

  //
  // Reload Plugins
  //
  $.fn.wpgp_reload_script = function( options ) {

    var settings = $.extend({
      dependency: true,
    }, options );

    return this.each( function() {

      var $this = $(this);

      // Avoid for conflicts
      if( !$this.data('inited') ) {

        // Field plugins
        $this.children('.wpgp-field-accordion').wpgp_field_accordion();
        $this.children('.wpgp-field-backup').wpgp_field_backup();
        $this.children('.wpgp-field-background').wpgp_field_background();
        $this.children('.wpgp-field-code_editor').wpgp_field_code_editor();
        $this.children('.wpgp-field-date').wpgp_field_date();
        $this.children('.wpgp-field-fieldset').wpgp_field_fieldset();
        $this.children('.wpgp-field-gallery').wpgp_field_gallery();
        $this.children('.wpgp-field-group').wpgp_field_group();
        $this.children('.wpgp-field-icon').wpgp_field_icon();
        $this.children('.wpgp-field-media').wpgp_field_media();
        $this.children('.wpgp-field-repeater').wpgp_field_repeater();
        $this.children('.wpgp-field-slider').wpgp_field_slider();
        $this.children('.wpgp-field-sortable').wpgp_field_sortable();
        $this.children('.wpgp-field-sorter').wpgp_field_sorter();
        $this.children('.wpgp-field-spinner').wpgp_field_spinner();
        $this.children('.wpgp-field-switcher').wpgp_field_switcher();
        $this.children('.wpgp-field-tabbed').wpgp_field_tabbed();
        $this.children('.wpgp-field-typography').wpgp_field_typography();
        $this.children('.wpgp-field-upload').wpgp_field_upload();
        $this.children('.wpgp-field-wp_editor').wpgp_field_wp_editor();

        // Field colors
        $this.children('.wpgp-field-border').find('.wpgp-color').wpgp_color();
        $this.children('.wpgp-field-background').find('.wpgp-color').wpgp_color();
        $this.children('.wpgp-field-color').find('.wpgp-color').wpgp_color();
        $this.children('.wpgp-field-color_group').find('.wpgp-color').wpgp_color();
        $this.children('.wpgp-field-link_color').find('.wpgp-color').wpgp_color();
        $this.children('.wpgp-field-typography').find('.wpgp-color').wpgp_color();

        // Field chosenjs
        $this.children('.wpgp-field-select').find('.wpgp-chosen').wpgp_chosen();

        // Field Checkbox
        $this.children('.wpgp-field-checkbox').find('.wpgp-checkbox').wpgp_checkbox();

        // Field Siblings
        $this.children('.wpgp-field-button_set').find('.wpgp-siblings').wpgp_siblings();
        $this.children('.wpgp-field-image_select').find('.wpgp-siblings').wpgp_siblings();
        $this.children('.wpgp-field-palette').find('.wpgp-siblings').wpgp_siblings();

        // Help Tooptip
        $this.children('.wpgp-field').find('.wpgp-help').wpgp_help();

        if( settings.dependency ) {
          $this.wpgp_dependency();
        }

        $this.data('inited', true);

        $(document).trigger('wpgp-reload-script', $this);

      }

    });
  };

  //
  // Document ready and run scripts
  //
  $(document).ready( function() {

    $('.wpgp-save').wpgp_save();
    $('.wpgp-confirm').wpgp_confirm();
    $('.wpgp-nav-options').wpgp_nav_options();
    $('.wpgp-nav-metabox').wpgp_nav_metabox();
    $('.wpgp-expand-all').wpgp_expand_all();
    $('.wpgp-search').wpgp_search();
    $('.wpgp-sticky-header').wpgp_sticky();
    $('.wpgp-taxonomy').wpgp_taxonomy();
    $('.wpgp-shortcode').wpgp_shortcode();
    $('.wpgp-page-templates').wpgp_page_templates();
    $('.wpgp-post-formats').wpgp_post_formats();
    $('.wpgp-onload').wpgp_reload_script();
    $('.widget').wpgp_widgets();

  });

})( jQuery, window, document );
 